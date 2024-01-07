import type { MaybePromise, UnknownRecord, Writable } from 'utility/types'
import { type APIResponse } from '@api/responses/types'

type NonFunction =
	| string | number | bigint | boolean | symbol
	| null | undefined | void
	| APIResponse | UnknownRecord

type PipeFn<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Event extends UnknownRecord = any, Input = any, Result extends NonFunction = any
> =
	| ((event: Event, input: Input) => MaybePromise<Result>)
	| ((event: Event, input: Input) =>
		(event: Event, input: Input) =>
			MaybePromise<Result>)

/** Returns the APIResponse from a Pipe Parameter Function */
type ParamReturnResponse<P extends PipeFn> =
	P extends PipeFn<infer _, infer _, infer R>
		? R extends APIResponse ? R : never : never

/** Returns the value as a non-constant */
type WritableInput<T> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends UnknownRecord | any[] ? Writable<T> : T

/** Returns the (non-APIResponse) content of the Pipe Parameter Function */
type GetPipeContent<I> =
	I extends PipeFn<infer _, infer _, infer R>
		? WritableInput<Exclude<R, APIResponse>> : WritableInput<Exclude<I, APIResponse>>

export function createEventPipe<T extends UnknownRecord = {}>() {
	type Fn<PreviousResult, Result extends NonFunction> = 
		| PipeFn<T, GetPipeContent<PreviousResult>, Result>
	
	function pipe<
		P0 extends Fn<(input: T) => void, R0>, const R0 extends NonFunction
	>(
		p0: P0 | R0
	): (event: T) => Promise<GetPipeContent<P0> | ParamReturnResponse<P0>>

	function pipe<
		P0 extends Fn<(input: T) => void, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1
	): (event: T) => Promise<GetPipeContent<P1> | ParamReturnResponse<P0 | P1>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2
	): (event: T) => Promise<GetPipeContent<P2> | ParamReturnResponse<P0 | P1 | P2>>

	function pipe(...functions: PipeFn<T, unknown, NonFunction>[]) {
		return async function pipedFunction(event: T) {
			let previousResult: unknown = undefined
			for (const fn of functions) {
				if(typeof fn !== 'function')
					throw new Error('Pipe functions must be functions')
				previousResult = await fn(event, previousResult)
				if(previousResult instanceof Response)
					return previousResult
			}
			return previousResult
		}
	}
	
	return pipe
}