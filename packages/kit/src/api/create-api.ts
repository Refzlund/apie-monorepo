import { RequestOptions } from '$/endpoint/types/callback'
import { apiHandler } from './api-handler'
import { Method, NobodyMethod, methods, nobodyMethods } from './methods'

export interface ApiOptions {
	/** Base options that are on every API request */
	baseRequestOptions?: RequestInit

	/** An alternative URL. Default is the site that you're on.	 */
	baseURL?: string
}

type Directory = {
	___path: string
}

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
					return createDirectory({ ___path: directory.___path + '/' + slug })
				}
			}
			directory[route] = createDirectory({ ___path: directory.___path + '/' + route })
			return directory[route]
		}

		/** api.users.post({ body: {...} }) */
		function handleEndpoint() {
			const method = route.toUpperCase()
			const path = directory.___path as string

			directory[route] = (body: BodyInit | null, options: RequestOptions = {}) => {
				if (options?.fetch == null && typeof document === 'undefined')
					return emptyProxy /* SSR: Do nothing. */

				if (nobodyMethods.includes(method as NobodyMethod)) {
					options = body as RequestOptions || {}
					body = null
				}

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
				if (methods.includes(route as Method))
					return handleEndpoint()
				return handleDirectory()
			}
		}) as T
	}

	return createDirectory({ ___path: '' })

}