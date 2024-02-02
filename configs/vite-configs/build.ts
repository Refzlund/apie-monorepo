import path from 'path'
import { type UserConfig, mergeConfig, build as viteBuild } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { parse as json5 } from 'json5'

interface BuildOptions {
	tsconfigPath: string

	/** @default ./src */
	rootDir?: string
	/** @default ./dist */
	outDir?: string
	vite?: UserConfig
}

export default async function build(options: BuildOptions, ...entries: string[]) {
	const root = options.rootDir || './src'
	const outDir = options.outDir || './dist'
	const array: UserConfig[] = []

	const plugins = [
		...(options.vite?.plugins || []),
		tsconfigPaths()
	]

	delete options.vite?.plugins

	let init = true
	for (const entry of entries) {
		const filePath = path.resolve(root, entry)
		const file = path.parse(filePath)
		const fileNamePath = path.join(entry, `../${file.name}`)

		array.push(mergeConfig(
			{
				build: {
					emptyOutDir: init,
					outDir,
					lib: {
						entry: filePath,
						name: file.name,
						fileName: fileNamePath
					},
				},
				plugins: init ? [...plugins, dts({
					include: ['src']
				})] : plugins
			} satisfies UserConfig,
			options.vite || {}
		))

		init = false
	}

	const file = Bun.file(options.tsconfigPath)
	const text = await file.text()

	try {
		// * We modify the tsconfig to have the 'rootDir' of the rootDir provided.
		// * Ex. instead of `./dist/src/index.d.ts` we get `./dist/index.d.ts`

		const tsconfig = json5(text)
		tsconfig.compilerOptions ??= {}
		tsconfig.compilerOptions.rootDir = root
		tsconfig.exclude ??= []
		tsconfig.exclude.push(outDir, '**/*.test.ts', '**/*.spec.ts')

		await Bun.write(file, JSON.stringify(tsconfig))

		const init = array.shift()
		await viteBuild(init)

		await Promise.all(
			array.map(v => viteBuild(v))
		)
	} catch (error) {
		
		console.error('Vite Build: An error occurred.')
		console.error(error)

	} finally {

		let written = false
		while (!written) {
			try {
				await Bun.write(file, text)
			} catch (error) {
				console.error('An error occurred trying to restore tsconfig. Trying again...')
				await new Promise(r => setTimeout(r, 250))
				continue
			}
			written = true
		}
		
	}
}