/// <reference types="vitest" />

import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

export default function config<const T extends string>(name: T) {
	return {
		build: {
			outDir: './.dist',
			lib: {
				entry: './src/index.ts',
				name,
				fileName: 'index'
			}
		},
		plugins: [
			tsconfigPaths(),
			dts({
				include: ['src']
			})
		],
		test: {
			watch: false,
			include: ['**/*.test.ts'],
			typecheck: {
				include: ['**/*.test.ts']
			}
		}
	} as const
} 