import path from 'path'
import { type UserConfig, mergeConfig, build as viteBuild } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

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

		array.push(mergeConfig(
			{
				build: {
					emptyOutDir: init,
					outDir: options.outDir || './dist',
					lib: {
						entry: filePath,
						name: file.name,
						fileName: file.name
					}
				},
				plugins: init ? [...plugins, dts({
					include: ['src']
				})] : plugins,
				test: {
					typecheck: {
						include: ['**/*.test.ts', './tests']
					}
				}
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

		const tsconfig = JSON.parse(text.replaceAll(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, ''))
		tsconfig.compilerOptions ??= {}
		tsconfig.compilerOptions.rootDir = root

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

		Bun.write(file, text)

	}
}