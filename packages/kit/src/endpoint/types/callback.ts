import { RequiredKeys, Simplify, UnknownRecord } from '$/types/utility'
import { IsUnknown } from '@apie/utility/types'
import { KitRequestInput } from './kitevent'
import { Method, NobodyMethod } from '$/api/methods'

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
	query?: UnknownRecord
	fetch?: typeof fetch
}

type O<T extends KitRequestInput> = Omit<T, 'body' | 'query'>

type BodyBuffer<T> =
	IsUnknown<T> extends true ? false : T extends typeof Buffer ? true : false
type Body<T extends KitRequestInput['body']> =
	BodyBuffer<T> extends true ? BodyInit : T

type OptionRequirements<I extends { query?: UnknownRecord, body?: unknown }> =
	(
		[RequiredKeys<I['query']>] extends [never]
		? { query?: IsUnknown<I['query']> extends true ? UnknownRecord : I['query'] }
		: { query: IsUnknown<I['query']> extends true ? UnknownRecord : I['query'] }
	) & (
		BodyBuffer<I['body']> extends true ? {
			headers: { 'content-type': string }
		} : {}
	)

export type EndpointRequestInput<
	I extends KitRequestInput,
	K extends Method
> =
	K extends NobodyMethod ?
	(
		true extends
		| ([RequiredKeys<O<I>>] extends [never] ? false : true)
		| ([RequiredKeys<I['query']>] extends [never] ? false : true)
		| BodyBuffer<I['body']>
		? [options: Simplify<O<I> & OptionRequirements<I>> & RequestOptions]
		: [options?: Simplify<O<I> & OptionRequirements<I>> & RequestOptions]
	)
	:
	(true extends
	// if any options required
	| ([RequiredKeys<O<I>>] extends [never] ? false : true)
	// or has query requirements
	| ([RequiredKeys<I['query']>] extends [never] ? false : true)
	| BodyBuffer<I['body']>	
	?
	[
		body: Body<I['body']>,
		options: Simplify<O<I> & OptionRequirements<I>> & RequestOptions
	]
	: false extends
	// if has body
	& IsUnknown<I['body']>
	// and is required
	& ([Extract<I['body'], undefined>] extends [never] ? false : true)
	?
	[
		body: Body<I['body']>,
		options?: I extends RequestOptions
			? Simplify<O<I> & OptionRequirements<I>> & RequestOptions
			: RequestOptions
	]
	: [
		body?: Body<I['body']>,
		options?: I extends RequestOptions
			? Simplify<O<I> & OptionRequirements<I>> & RequestOptions
			: RequestOptions
	])