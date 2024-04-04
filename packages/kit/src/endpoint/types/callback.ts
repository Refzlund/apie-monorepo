import { RequiredKeys, Simplify, UnknownRecord } from '$/types/utility'
import { IsUnknown } from '@apie/utility/types'
import { KitRequestInput } from './kitevent'
import { Method, NobodyMethod } from '$/api/methods'

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
	query?: UnknownRecord
	fetch?: typeof fetch
}

type O<T extends KitRequestInput> = Omit<T, 'body' | 'query'>

type QueryRequired<I extends { query?: UnknownRecord }> =
	[RequiredKeys<I['query']>] extends [never]
	? { query?: IsUnknown<I['query']> extends true ? UnknownRecord : I['query'] }
	: { query: IsUnknown<I['query']> extends true ? UnknownRecord : I['query'] }

export type EndpointRequestInput<
	I extends KitRequestInput,
	K extends Method
> =
	K extends NobodyMethod ?
	(
		true extends
		| ([RequiredKeys<O<I>>] extends [never] ? false : true)
		| ([RequiredKeys<I['query']>] extends [never] ? false : true)
		? [options: Simplify<O<I> & QueryRequired<I>> & RequestOptions]
		: [options?: Simplify<O<I> & QueryRequired<I>> & RequestOptions]
	)
	:
	(true extends
	// if any options required
	| ([RequiredKeys<O<I>>] extends [never] ? false : true)
	// or has query requirements
	| ([RequiredKeys<I['query']>] extends [never] ? false : true)
	?
	[
		body: IsUnknown<I['body']> extends true ? null : I['body'],
		options: Simplify<O<I> & QueryRequired<I>> & RequestOptions
	]
	: false extends
	// if has body
	& IsUnknown<I['body']>
	// and is required
	& ([Extract<I['body'], undefined>] extends [never] ? false : true)
	?
	[
		body: IsUnknown<I['body']> extends true ? null : I['body'],
		options?: I extends RequestOptions
			? Simplify<O<I> & QueryRequired<I>> & RequestOptions
			: RequestOptions
	]
	: [
		body?: IsUnknown<I['body']> extends true ? null : I['body'],
		options?: I extends RequestOptions
			? Simplify<O<I> & QueryRequired<I>> & RequestOptions
			: RequestOptions
	])