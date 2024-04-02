import { RequestOptions } from '$/endpoint/callback'
import { apiHandler } from './api-handler'

export interface ApiOptions {
	/** Base options that are on every API request */
	baseRequestOptions?: RequestInit

	/** An alternative URL. Default is the site that you're on.	 */
	baseURL?: string
}

type Directory = {
	path: string
}

const endpoints = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] as const

const emptyProxy = new Proxy(() => emptyProxy, {
	get: () => emptyProxy
})

export function createAPI<T>(opts: ApiOptions = {}): T {

	function createDirectory(directory: Directory): T {
		let route: string = '' // Set in Proxy

		/** api.users.user$(id). */
		function handleDirectory() {
			const isSlug = route.match(/\$$/g)
			if (isSlug) {
				return function sluggedRoute(slug: string) {
					return createDirectory({ path: directory.path + '/' + slug })
				}
			}
			directory[route] = createDirectory({ path: directory.path + '/' + route })
			return directory[route]
		}

		/** api.users.post({ body: {...} }) */
		function handleEndpoint() {
			const method = route.toUpperCase()
			const path = directory.path as string

			directory[route] = (body: BodyInit | null, options: RequestOptions = {}) => {
				if (options?.fetch == null && typeof document === 'undefined')
					return emptyProxy /* SSR: Do nothing. */

				const _fetch = options.fetch || fetch
				delete options.fetch

				const query = options.query
				delete options.query

				return apiHandler({
					apiOptions: opts,
					routePath: path,
					fetch: _fetch,
					query,
					request: {
						...options, // headers, etc.
						body,
						method
					}
				})
			}
			return directory[route]
		}

		return new Proxy(directory, {
			get(directory, _route) {
				route = _route as string

				if (route in directory)
					return directory[route]
				if (endpoints.includes(route as typeof endpoints[number]))
					return handleEndpoint()
				return handleDirectory()
			}
		}) as T
	}

	return createDirectory({ path: '' })

}