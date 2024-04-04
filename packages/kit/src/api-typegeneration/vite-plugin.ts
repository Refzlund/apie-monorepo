import { exists } from 'fs/promises'
import { resolve } from 'path'
import { cwd } from 'process'
import apiTemplate from './api-template'
import { Plugin } from 'vite'
import { createGeneratedType } from './create-generated-type'

interface APIEKitOptions {

	paths?: {
		/** @default 'src/api.ts' */
		apiFile?: string

		/** @default 'src/.generated-api.ts' */
		generatedTypes?: string

		/** @default 'src/routes' */
		routes?: string
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
		generatedTypes = defaultTypePath
	} = paths


	if (generatedTypes === defaultTypePath) {
		const gitignore = resolve(root, '.gitignore')
		Bun.file(gitignore).text().then(v => {
			if (v.includes(defaultTypePath))
				return
			Bun.write(gitignore, v + '\n' + defaultTypePath)
		})
	}

	const apiPath = resolve(root, apiFile)
	exists(apiPath).then(v => !v && !Bun.write(apiPath, apiTemplate))

	const routesPath = resolve(root, routes)
	const generatedPath = resolve(root, generatedTypes)

	const write =
		async () => await Bun.write(generatedPath, await createGeneratedType(routesPath))

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

