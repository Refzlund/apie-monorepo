import { existsSync } from 'fs'
import { resolve } from 'path'
import { cwd } from 'process'
import apiTemplate from './api-template'
import { Plugin } from 'vite'
import { createGeneratedType } from './create-generated-type'
import { readFileSync, writeFileSync } from 'fs'

interface APIEKitOptions {

	paths?: {
		/** @default 'src/api.ts' */
		apiFile?: string

		/** @default 'src/.generated-api.ts' */
		generatedTypes?: string

		/** @default 'src/routes' */
		routes?: string

		/** 
		  * Whether to ignore the `generatedTypes` path by adding it to .gitignore
		  * @default true
		*/
		gitIgnoreGeneratedTypes?: boolean
	}

}

const root = cwd()

export function watchAPI({ paths = {} }: APIEKitOptions = {}): Plugin {
	if (process.env.NODE_ENV === 'production')
		return { name: '@apie/kit' }

	const defaultTypePath = 'src/.generated-api.ts'
	const {
		apiFile = 'src/api.ts',
		routes = 'src/routes',
		generatedTypes = defaultTypePath,
		gitIgnoreGeneratedTypes = true
	} = paths

	if (gitIgnoreGeneratedTypes) {
		const gitignore = resolve(root, '.gitignore')
		const file = readFileSync(gitignore, 'utf-8')
		if (!file.includes(generatedTypes)) {
			writeFileSync(gitignore, file + '\n' + generatedTypes, 'utf-8')
		}
	}

	const apiPath = resolve(root, apiFile)
	
	if (!existsSync(apiPath))
		writeFileSync(apiPath, apiTemplate, 'utf-8')

	const routesPath = resolve(root, routes)
	const generatedPath = resolve(root, generatedTypes)

	const write =
		async () => writeFileSync(generatedPath, await createGeneratedType(routesPath), 'utf-8')

	write()

	return {
		name: '@apie/kit',
		configureServer(vite) {
			vite.watcher.on('change', async (path) => {
				if (path.includes(routesPath))
					await write()
			})
		}
	}
}

