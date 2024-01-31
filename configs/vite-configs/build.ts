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

	for (const entry of entries) {
		const filePath = path.resolve(root, entry)
		const file = path.parse(filePath)

		array.push(mergeConfig(
			{
				build: {
					outDir: options.outDir || './dist',
					lib: {
						entry: filePath,
						name: file.name,
						fileName: file.name
					}
				},
				plugins: [
					tsconfigPaths(),
					dts({
						include: ['src']
					})
				],
				test: {
					typecheck: {
						include: ['**/*.test.ts']
					}
				}
			} satisfies UserConfig,
			options.vite || {}
		))
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

		for (const entry of array)
			await viteBuild(entry)

	} catch (error) {

		console.error('Vite Build: An error occurred.')
		console.error(error)

	} finally {

		Bun.write(file, text)

	}
}