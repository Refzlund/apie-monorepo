/// <reference types="vitest" />

import path from 'path'
import { type UserConfig, mergeConfig, build as viteBuild } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

interface BuildOptions {
	tsconfigPath: string

	/** @default ./src */
	root?: string
	/** @default ./dist */
	outDir?: string
	vite?: UserConfig
}

export default async function build(options: BuildOptions, ...entries: string[]) {
	const root = options.root || './src'
	const array: UserConfig[] = []

	for (const entry of entries) {
		const filePath = path.resolve(root, entry)
		const file = path.parse(filePath)

		console.log(import.meta.dir)

		array.push(mergeConfig(
			{
				build: {
					outDir: options.outDir || './dist',
					lib: {
						entry: filePath,
						name: file.name,
						fileName: file.name
					},
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

	for (const entry of array)
		await viteBuild(entry)
}