import { APIKit } from '$/apikit'
import { KitResponse } from '$/response/kitresponse'
import { DeepWriteable, Intersect, MaybePromise, Simplify, UnknownRecord, apikit } from '$/types/utility'
import { KitEvent, KitRequestInput, Locals } from './event'



export type Endpoint<
	Input extends KitRequestInput = KitRequestInput,
	Responses extends KitResponse = KitResponse,
	InL extends UnknownRecord = {},
	OutL extends UnknownRecord = {}
> =
	(e: KitEvent<Input> & Locals<InL>) => MaybePromise<Responses | OutL>

type EndpointFn<
	Input extends KitRequestInput = {},
	L extends UnknownRecord = {},
	R extends EndpointFnResult = EndpointFnResult
> =
	(event: KitEvent<Input> & Locals<L>) => MaybePromise<R>

type EndpointFnResult<T = unknown> =
	| KitResponse
	| Record<string | number | symbol, T>
	| void

type ExtractLocals<R extends EndpointFnResult<unknown>> =
	[R] extends [never] | [void] ? {}
	: Exclude<R, Function | KitResponse | undefined | void> & {}

	
export function endpoint<
	Input extends KitRequestInput = {},
	L extends UnknownRecord = {}
>(
	event?: KitEvent<Input> & Locals<L>
) {
	type R = EndpointFnResult
	
	type G<R extends EndpointFnResult<unknown>, L extends UnknownRecord = {}> =
		Simplify<DeepWriteable<Intersect<ExtractLocals<R & { [apikit]: unknown }>> & L>>
	
	type P = Simplify<L> 
	type K = KitResponse

	return function <
		const R0 extends R = never, const R1 extends R = never,
		const R2 extends R = never, const R3 extends R = never,
		const R4 extends R = never, const R5 extends R = never,
	>(
		a0: EndpointFn<Input, G<{} , P>, R0>,
		a1?: EndpointFn<Input, G<R0, P>, R1>,
		a2?: EndpointFn<Input, G<R0 | R1, P> , R2>,
		a3?: EndpointFn<Input, G<R0 | R1 | R2, P>, R3>,
		a4?: EndpointFn<Input, G<R0 | R1 | R2 | R3, P>, R4>,
		a5?: EndpointFn<Input, G<R0 | R1 | R2 | R3 | R4, P>, R5>,
	) {	
		type Responses = Endpoint<
			Simplify<Input>,
			| Extract<R0, K>
			| Extract<R1, K>
			| Extract<R2, K>
			| Extract<R3, K>
			| Extract<R4, K>
			| Extract<R5, K>
			, Simplify<L>,
			Simplify<G<R0 | R1 | R2 | R3 | R4 | R5, P>>
		>

		type EndpointReturn = Responses

		const fn = function (event: KitEvent) {

		}

		if (event)
			return fn(event) as unknown as EndpointReturn
		return fn as unknown as EndpointReturn 
	}
}