import { KitResponse } from '$/response/kitresponse'
import { ToJSON } from '$/types/json'
import { Flat, MaybePromise, Simplify, brand } from '$/types/utility'
import { KitEvent, KitRequestInput, Locals } from './event'



export type Endpoint<
	Input extends KitRequestInput = KitRequestInput,
	Responses extends KitResponse<number, boolean> = KitResponse,
> = Responses & { [brand]: Input }

type EndpointFn<
	Input extends KitRequestInput = {},
	L extends Record<string | number | symbol, unknown> = {},
	R extends EndpointFunctionResponse<unknown> = EndpointFunctionResponse<unknown>
> = (event: KitEvent<Input> & Locals<L>) => MaybePromise<R>

type EndpointFunctionResponse<T> =
	| KitResponse
	| Record<string | number | symbol, T>
	| ((...args: unknown[]) => EndpointFunctionResponse<T>)
	| void


/** GetLocals */
type GetLocals<
	R extends EndpointFunctionResponse<unknown>[]
> = Flat<Exclude<R[number], Function | KitResponse | undefined>> & {}

export function endpoint<Input extends KitRequestInput = {}>(
	event?: KitEvent<Input>
) {
	type R<T = unknown> = EndpointFunctionResponse<T>
	type G<R extends EndpointFunctionResponse<unknown>[]> = Simplify<GetLocals<R>>

	return function <
		L1 extends G<[R0]>,
		L2 extends G<[R0, R1]>,
		L3 extends G<[R0, R1, R2]>,
		L4 extends G<[R0, R1, R2, R3]>,
		L5 extends G<[R0, R1, R2, R3, R4]>,

		const R0 extends R = never, const R1 extends R = never,
		const R2 extends R = never, const R3 extends R = never,
		const R4 extends R = never, const R5 extends R = never,
	>(
		a0: EndpointFn<Input, {}, R0>,
		a1?: EndpointFn<Input, L1, R1>,
		a2?: EndpointFn<Input, L2, R2>,
		a3?: EndpointFn<Input, L3, R3>,
		a4?: EndpointFn<Input, L4, R4>,
		a5?: EndpointFn<Input, L5, R5>,
	) {
		type K =
			| KitResponse<number, boolean, unknown, string>
			| KitResponse<number, boolean, undefined, string>

		type Responses = Endpoint<ToJSON<Input>,
			| Extract<R0, K>
			| Extract<R1, K>
			| Extract<R2, K>
			| Extract<R3, K>
			| Extract<R4, K>
			| Extract<R5, K>
		>

		type EndpointReturn = Responses

		const fn = function (event: KitEvent) {

		}

		if (event)
			return fn(event) as unknown as EndpointReturn
		return fn as unknown as EndpointReturn
	}
}