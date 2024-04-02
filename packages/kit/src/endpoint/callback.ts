import { RequiredKeys, Simplify, UnknownRecord } from '$/types/utility'
import { KitRequestInput } from './event'

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
	query?: UnknownRecord
	fetch?: typeof fetch
}

type O<T extends KitRequestInput> = Omit<T, 'body' | 'query'>

type QueryRequired<I extends { query?: UnknownRecord }> =
	[RequiredKeys<I['query']>] extends [never]
	? { query?: I['query'] }
	: { query: I['query'] }

export type EndpointRequestInput<
	I extends KitRequestInput
> =
	true extends
		// if any options required
		| ([RequiredKeys<O<I>>] extends [never] ? false : true)
		// or has query requirements
		| ([RequiredKeys<I['query']>] extends [never] ? false : true)
	?
	[
		body: I['body'],
		options: Simplify<O<I> & QueryRequired<I>> & RequestOptions
	]
	: true extends 
		// if has body
		& ([I['body']] extends [KitRequestInput['body']] ? true : false)
		// and is required
		& ([Extract<I['body'], undefined>] extends [never] ? true : false)
	?
	[
		body: I['body'] extends KitRequestInput['body']
			? I['body']
			: null,	
		options?: I extends RequestOptions
			? Simplify<O<I> & QueryRequired<I>> & RequestOptions
			: RequestOptions
	]
	: [
		body?: I['body'] extends KitRequestInput['body']
			? I['body']
			: null,
		options?: I extends RequestOptions
			? Simplify<O<I> & QueryRequired<I>> & RequestOptions
			: RequestOptions
	]