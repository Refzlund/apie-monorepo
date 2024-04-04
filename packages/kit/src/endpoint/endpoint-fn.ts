import { IsUnknown, UnknownRecord } from '@apie/utility/types'
import { KitEvent, KitRequestInput } from './types/kitevent'
import { Pipe, PipeType, Pipeline, PipelineResponse, PipelineResult, createEventPipe } from '@apie/pipe'
import z from 'zod'
import { validateQuery } from './pipes/validate-query'
import { validateJSON } from './pipes/validate-json'
import { eJSON } from './pipes/e-json'
import { APIResponse } from '@apie/responses'

export type Endpoint<I extends KitRequestInput, R> =
	Pipeline<(event: KitEvent<I>) => Promise<R>>

export const kitPipe: Pipe<KitEvent<{
	body?: unknown
	query?: UnknownRecord
}>> = createEventPipe()

const pipe = createEventPipe<KitEvent>()

export type Validator = {
	/** Access the parsed body via `await e.json()` */
	body?: z.AnyZodObject
	/** Access the parsed query via `e.query` */
	query?: z.AnyZodObject
}

export const endpoint =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	<T extends Validator, K extends Pipeline<any>>(
		validator: T,
		cb: (pipe: Pipe<KitEvent<
			true extends IsUnknown<T['query']> & IsUnknown<T['body']> ? {}
			: true extends IsUnknown<T['query']>
			? { body: z.output<NonNullable<T['body']>> }
			: true extends IsUnknown<T['body']>
			? { query: z.output<NonNullable<T['query']>> }
			: {
				body: z.output<NonNullable<T['body']>>
				query: z.output<NonNullable<T['query']>>
		}>>) => K
	) => {
		const pipeline = kitPipe(
			eJSON,
			validateJSON(validator),
			validateQuery(validator),

			cb(kitPipe as Pipe<KitEvent>)
		)

		return pipeline as unknown as Pipeline<
			(event: PipeType<typeof cb>) => Promise<
				| (
					IsUnknown<T['body']> extends false
					? PipelineResponse<ReturnType<typeof validateJSON>>
					: never
				)
				| (
					IsUnknown<T['query']> extends false
					? PipelineResponse<ReturnType<typeof validateQuery>>
					: never
				)
				| PipelineResult<K>
			>
		>
	}
	
	
/* TODO
		as MergePipelines<,
			IsUnknown<T['body']> extends true ? ... : ReturnType<typeof validateJSON>,
			IsUnknown<T['query']> extends true ? ... : ReturnType<typeof validateQuery>,
			K
		>
	*/



// export type Endpoint<
// 	Input extends KitRequestInput = KitRequestInput,
// 	Responses extends APIResponse = APIResponse,
// 	InL extends UnknownRecord = {},
// 	OutL extends UnknownRecord = {}
// > =
// 	(e: KitEvent<Input> & Locals<InL>) => MaybePromise<Responses | OutL>

// type EndpointFn<
// 	Input extends KitRequestInput = {},
// 	L extends UnknownRecord = {},
// 	R extends EndpointFnResult = EndpointFnResult
// > =
// 	(event: KitEvent<Input> & Locals<L>) => MaybePromise<R>

// type EndpointFnResult<T = unknown> =
// 	| APIResponse
// 	| Record<string | number | symbol, T>
// 	| void

// type ExtractLocals<R extends EndpointFnResult<unknown>> =
// 	[R] extends [never] | [void] ? {}
// 	: Exclude<R, Function | APIResponse | undefined | void> & {}


// export function endpoint<
// 	Input extends KitRequestInput = {},
// 	L extends UnknownRecord = {}
// >(
// 	event?: KitEvent<Input> & Locals<L>
// ) {
// 	type R = EndpointFnResult

// 	type G<R extends EndpointFnResult<unknown>, L extends UnknownRecord = {}> =
// 		Simplify<DeepWriteable<Intersect<ExtractLocals<R & { [apikit]: unknown }>> & L>>

// 	type P = Simplify<L>
// 	type K = APIResponse

// 	return function <
// 		const R0 extends R = never, const R1 extends R = never,
// 		const R2 extends R = never, const R3 extends R = never,
// 		const R4 extends R = never, const R5 extends R = never,
// 	>(
// 		a0: EndpointFn<Input, G<{}, P>, R0>,
// 		a1?: EndpointFn<Input, G<R0, P>, R1>,
// 		a2?: EndpointFn<Input, G<R0 | R1, P>, R2>,
// 		a3?: EndpointFn<Input, G<R0 | R1 | R2, P>, R3>,
// 		a4?: EndpointFn<Input, G<R0 | R1 | R2 | R3, P>, R4>,
// 		a5?: EndpointFn<Input, G<R0 | R1 | R2 | R3 | R4, P>, R5>,
// 	) {
// 		type Responses = Endpoint<
// 			Simplify<Input>,
// 			| Extract<R0, K>
// 			| Extract<R1, K>
// 			| Extract<R2, K>
// 			| Extract<R3, K>
// 			| Extract<R4, K>
// 			| Extract<R5, K>
// 			, Simplify<L>,
// 			Simplify<G<R0 | R1 | R2 | R3 | R4 | R5, P>>
// 		>

// 		type EndpointReturn = Responses

// 		const fn = function (event: KitEvent) {

// 		}

// 		if (event)
// 			return fn(event) as unknown as EndpointReturn
// 		return fn as unknown as EndpointReturn
// 	}
// }