import { ToJSON } from '$/types/json'
import { RequiredKeys, Simplify, UnknownRecord } from '$/types/utility'
import { KitRequestInput } from './event'

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
	query?: UnknownRecord
}

type O<T extends KitRequestInput> = Omit<T, 'body'>

export type EndpointRequestInput<
	I extends KitRequestInput
> =
	(
		// if has options
		[O<I>] extends [RequestOptions] ?
		// and is required
		[RequiredKeys<O<I>>] extends [never] ?
		false : true : false
	) extends true ?
		[body: Readonly<ToJSON<I['body']>>, opts: Simplify<O<I>> & RequestOptions]
	: (
		// if has body
		[I['body']] extends [KitRequestInput['body']] ?
		// and is required
		[Extract<I['body'], undefined>] extends [never] ?
		true : false : false
	) extends true ?
		[body: I['body'] extends KitRequestInput['body'] ? Readonly<ToJSON<I['body']>> : null, opts?: O<I> extends RequestOptions ? Simplify<O<I>> & RequestOptions : RequestOptions]
	:  [body?: I['body'] extends KitRequestInput['body'] ? Readonly<ToJSON<I['body']>> : null, opts?: O<I> extends RequestOptions ? Simplify<O<I>> & RequestOptions : RequestOptions]