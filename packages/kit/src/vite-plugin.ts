import { exists } from 'node:fs/promises'
import { resolve } from 'path'
import { cwd } from 'node:process'
import apiTemplate from './api-typegeneration/api-template'
import { Plugin } from 'vite'
import { createGeneratedType } from './api-typegeneration/create-generated-type'

interface APIEKitOptions {

	paths?: {
		/** @default './src/api.ts' */
		apiFile?: string
		
		/** @default './.svelte-kit/__generated-api.ts' */
		generatedTypes?: string

		/** @default './src/routes' */
		routes?: string
	}

}

const root = cwd()

export function watchAPI({ paths }: APIEKitOptions = {}): Plugin {
	if (process.env.NODE_ENV === 'production')
		return { name: '@apie/kit' }

	const apiPath = resolve(root, paths?.apiFile || './src/api.ts')
	exists(apiPath).then(v => !v && !Bun.write(apiPath, apiTemplate))

	const routesPath = resolve(root, paths?.routes || './src/routes')
	const generatedPath = resolve(root, paths?.generatedTypes || './.svelte-kit/__generated-api.ts')

	const write =
		async () => await Bun.write(generatedPath, await createGeneratedType(routesPath))
	
	write()

	return {
		name: '@apie/kit',
		configureServer(vite) {
			vite.watcher.on('change', async (path) => {
				if(path.includes(paths?.routes || './src/routes'))
					await write()
			})
		}
	}
}

