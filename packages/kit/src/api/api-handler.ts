import { UnknownRecord } from '@apie/utility/types'
import { ApiOptions } from './create-api'

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

export function apiHandler(content: HandlerContent) {

}