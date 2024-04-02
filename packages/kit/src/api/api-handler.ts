import { UnknownRecord } from '@apie/utility/types'
import { ApiOptions } from './create-api'
import { apiProxy } from './api-proxy'

interface HandlerContent {
	request: RequestInit

	/** Query (aka URLSearchParams) associated with the URL */
	query?: UnknownRecord

	apiOptions: ApiOptions

	/** The path for the API call */
	routePath: string

	/** If using API from the server e.g. load */
	fetch: typeof fetch
}

export function apiHandler({
	request,
	query,
	apiOptions,
	routePath,
	fetch,
}: HandlerContent) {

	request.headers ??= {}
	
	// * cache-control
	if (request.method === 'GET' && !('cache-control' in request.headers))
		request.headers['cache-control'] = 'public, max-age=604800, immutable'

	// * content-type
	if (typeof request.body === 'object' && !('content-type' in request.headers)) {
		request.headers['content-type'] = 
			request.body instanceof FormData ? 'multipart/form-data' : 'application/json'
	}

	const url = new URL(routePath, apiOptions.baseURL || '')
	
	// * Query
	for (const key in query) {
		const value = query[key]
		if (value === undefined) continue
		if (typeof value === 'object' && !(value instanceof Date)) {
			url.searchParams.set(key, JSON.stringify(value))
			continue
		}
		url.searchParams.set(key, value)
	}

	if (request.method === 'GET' || request.method === 'HEAD')
		delete request.body
	else {
		if (request.body instanceof FormData) { /* ignore */ }
		else if(typeof request.body === 'object') {
			request.body = JSON.stringify(request.body)
		}
	}

	const response = fetch(url, { ...apiOptions.baseRequestOptions, ...request })
	return apiProxy(response)
}