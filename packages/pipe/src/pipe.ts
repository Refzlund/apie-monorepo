import type { MaybePromise, MaybeArray, UnknownRecord, Writable, IsUnknown } from '@apie/utility/types'
import { type APIResponse } from '@apie/responses/types'
import { InternalServerError, isResponse } from '@apie/responses'

declare const NilSymbol: unique symbol
type Nil = { [NilSymbol]: null }
type NonFn =
	| string | number | bigint | boolean | symbol
	| null | undefined | void
	| APIResponse | UnknownRecord | Nil

export type PipeFn<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Event extends UnknownRecord = any, Input = any, Result = any
> = (event: Event, input: Input) => MaybePromise<Result>

/** Returns the APIResponse from a Pipe Parameter Function */
type ParamReturnResponse<P extends PipeFn> =
	P extends PipeFn<infer _, infer _, infer R>
	? (R extends APIResponse ? R : never)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: P extends PipeFn<any, any, infer R>
	? (R extends APIResponse ? R : never)
	: never

/** Returns the value as a non-constant */
type WritableInput<T> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends UnknownRecord | any[] ? Writable<T> : T

/** Returns the (non-APIResponse) content of the Pipe Parameter Function */
type PipeOrValue<P = never, R = unknown> =
	[Nil] extends [R]
	? P extends PipeFn<infer _, infer _, infer TReturn>
	? WritableInput<Exclude<TReturn, APIResponse>>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: P extends PipeFn<any, any, infer TReturn>
	? WritableInput<Exclude<TReturn, APIResponse>>
	: never
	: WritableInput<Exclude<R, APIResponse>>

interface Options<T extends UnknownRecord> {
	/** Functions to run before every pipeline */
	before?: MaybeArray<((event: T) => unknown)>

	/** Functions to run after every pipeline (except if it trows) */
	after?: MaybeArray<((event: T, result: unknown) => unknown)>

	/** Functions to always run after every pipeline */
	finally?: MaybeArray<((event: T, result?: unknown, error?: unknown) => unknown)>

	catch?(event: T, error: unknown): APIResponse
}

export function createEventPipe<T extends UnknownRecord = {}>(
	options: Options<T> = {}
) {
	type Fn<Input, Result> = PipeFn<T, Input, Result>

	function errored(event: T, error: unknown) {
		try {
			if (Array.isArray(options?.finally))
				options?.finally?.forEach(fn => fn(event, undefined, error))
			else
				options?.finally?.(event, undefined, error)
		} catch (err) {
			error = err
		}
		try {
			return options?.catch?.(event, error) || InternalServerError()
		} catch (error) {
			console.error(error)
			return InternalServerError({ message: 'Pipeline: "catch"-stage has thrown an error.' })
		}

	}

	function before(event: T) {
		try {
			if (Array.isArray(options?.before))
				options?.before?.forEach(fn => fn(event))
			else
				options?.before?.(event)
		} catch (error) {
			return errored(event, error)
		}
	}

	function after(event: T, result: unknown) {
		try {
			if (Array.isArray(options?.after))
				options?.after?.forEach(fn => fn(event, result))
			else
				options?.after?.(event, result)

			if (Array.isArray(options?.finally))
				options?.finally?.forEach(fn => fn(event, result, undefined))
			else
				options?.finally?.(event, result, undefined)

		} catch (error) {
			return errored(event, error)
		}
	}



	//#region Pipe implementation
	type Pipe<Pn extends PipeFn, Rn, Input, Pall extends PipeFn> =
		IsUnknown<Input> extends true ? (
			(event: T) => Promise<PipeOrValue<Pn, Rn> | ParamReturnResponse<Pall>>
		) : (undefined extends Input ? (
			(event: T, input?: Input | void) =>
				Promise<PipeOrValue<Pn, Rn> | ParamReturnResponse<Pall>>
		) :
			(event: T, input: Input) =>
				Promise<PipeOrValue<Pn, Rn> | ParamReturnResponse<Pall>>
		)

	/* eslint-disable @typescript-eslint/no-explicit-any */
	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		Input
	>(
		p0: P0 | R0
	): Pipe<P0, R0, Input, P0>

	function pipe<
		const P0 extends Fn<Input, any>, const R0 extends NonFn,
		const P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		Input,
	>(
		p0: P0 | R0, p1: P1 | R1
	): Pipe<P1, R1, Input, P0 | P1>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2
	): Pipe<P2, R2, Input, P0 | P1 | P2>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3
	): Pipe<P3, R3, Input, P0 | P1 | P2 | P3>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4
	): Pipe<P4, R4, Input,
		P0 | P1 | P2 | P3 | P4
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5
	): Pipe<P5, R5, Input,
		P0 | P1 | P2 | P3 | P4 | P5
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6
	): Pipe<P6, R6, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7
	): Pipe<P7, R7, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8
	): Pipe<P8, R8, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9
	): Pipe<P9, R9, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10
	): Pipe<P10, R10, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
	): Pipe<P11, R11, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12
	): Pipe<P12, R12, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		P13 extends Fn<PipeOrValue<P12, R12>, any>, const R13 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13
	): Pipe<P13, R13, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		P13 extends Fn<PipeOrValue<P12, R12>, any>, const R13 extends NonFn,
		P14 extends Fn<PipeOrValue<P13, R13>, any>, const R14 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14
	): Pipe<P14, R14, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		P13 extends Fn<PipeOrValue<P12, R12>, any>, const R13 extends NonFn,
		P14 extends Fn<PipeOrValue<P13, R13>, any>, const R14 extends NonFn,
		P15 extends Fn<PipeOrValue<P14, R14>, any>, const R15 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15
	): Pipe<P15, R15, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		P13 extends Fn<PipeOrValue<P12, R12>, any>, const R13 extends NonFn,
		P14 extends Fn<PipeOrValue<P13, R13>, any>, const R14 extends NonFn,
		P15 extends Fn<PipeOrValue<P14, R14>, any>, const R15 extends NonFn,
		P16 extends Fn<PipeOrValue<P15, R15>, any>, const R16 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16
	): Pipe<P16, R16, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		P13 extends Fn<PipeOrValue<P12, R12>, any>, const R13 extends NonFn,
		P14 extends Fn<PipeOrValue<P13, R13>, any>, const R14 extends NonFn,
		P15 extends Fn<PipeOrValue<P14, R14>, any>, const R15 extends NonFn,
		P16 extends Fn<PipeOrValue<P15, R15>, any>, const R16 extends NonFn,
		P17 extends Fn<PipeOrValue<P16, R16>, any>, const R17 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17
	): Pipe<P17, R17, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		P13 extends Fn<PipeOrValue<P12, R12>, any>, const R13 extends NonFn,
		P14 extends Fn<PipeOrValue<P13, R13>, any>, const R14 extends NonFn,
		P15 extends Fn<PipeOrValue<P14, R14>, any>, const R15 extends NonFn,
		P16 extends Fn<PipeOrValue<P15, R15>, any>, const R16 extends NonFn,
		P17 extends Fn<PipeOrValue<P16, R16>, any>, const R17 extends NonFn,
		P18 extends Fn<PipeOrValue<P17, R17>, any>, const R18 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18
	): Pipe<P18, R18, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		P13 extends Fn<PipeOrValue<P12, R12>, any>, const R13 extends NonFn,
		P14 extends Fn<PipeOrValue<P13, R13>, any>, const R14 extends NonFn,
		P15 extends Fn<PipeOrValue<P14, R14>, any>, const R15 extends NonFn,
		P16 extends Fn<PipeOrValue<P15, R15>, any>, const R16 extends NonFn,
		P17 extends Fn<PipeOrValue<P16, R16>, any>, const R17 extends NonFn,
		P18 extends Fn<PipeOrValue<P17, R17>, any>, const R18 extends NonFn,
		P19 extends Fn<PipeOrValue<P18, R18>, any>, const R19 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18, p19: P19 | R19
	): Pipe<P19, R19, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18 | P19
	>

	function pipe<
		P0 extends Fn<Input, any>, const R0 extends NonFn,
		P1 extends Fn<PipeOrValue<P0, R0>, any>, const R1 extends NonFn,
		P2 extends Fn<PipeOrValue<P1, R1>, any>, const R2 extends NonFn,
		P3 extends Fn<PipeOrValue<P2, R2>, any>, const R3 extends NonFn,
		P4 extends Fn<PipeOrValue<P3, R3>, any>, const R4 extends NonFn,
		P5 extends Fn<PipeOrValue<P4, R4>, any>, const R5 extends NonFn,
		P6 extends Fn<PipeOrValue<P5, R5>, any>, const R6 extends NonFn,
		P7 extends Fn<PipeOrValue<P6, R6>, any>, const R7 extends NonFn,
		P8 extends Fn<PipeOrValue<P7, R7>, any>, const R8 extends NonFn,
		P9 extends Fn<PipeOrValue<P8, R8>, any>, const R9 extends NonFn,
		P10 extends Fn<PipeOrValue<P9, R9>, any>, const R10 extends NonFn,
		P11 extends Fn<PipeOrValue<P10, R10>, any>, const R11 extends NonFn,
		P12 extends Fn<PipeOrValue<P11, R11>, any>, const R12 extends NonFn,
		P13 extends Fn<PipeOrValue<P12, R12>, any>, const R13 extends NonFn,
		P14 extends Fn<PipeOrValue<P13, R13>, any>, const R14 extends NonFn,
		P15 extends Fn<PipeOrValue<P14, R14>, any>, const R15 extends NonFn,
		P16 extends Fn<PipeOrValue<P15, R15>, any>, const R16 extends NonFn,
		P17 extends Fn<PipeOrValue<P16, R16>, any>, const R17 extends NonFn,
		P18 extends Fn<PipeOrValue<P17, R17>, any>, const R18 extends NonFn,
		P19 extends Fn<PipeOrValue<P18, R18>, any>, const R19 extends NonFn,
		P20 extends Fn<PipeOrValue<P19, R19>, any>, const R20 extends NonFn,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18, p19: P19 | R19, p20: P20 | R20
	): Pipe<P20, R20, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18 | P19 | P20
	>

	/* eslint-enable @typescript-eslint/no-explicit-any */
	//#endregion

	function pipe(...params: Array<NonFn | PipeFn<T, unknown, NonFn>>) {
		return async function pipedFunction(event: T, input: unknown = undefined) {
			let previousResult = input

			let result = before(event)
			if (result !== undefined) return result

			for (const pm of params) {
				if (typeof pm !== 'function') {
					previousResult = pm
					continue
				}

				if (isResponse(pm)) {
					previousResult = pm
					break
				}

				try {
					previousResult = await pm(event, previousResult)
				} catch (error) {
					return errored(event, error)
				}

				if (previousResult instanceof Response) {
					const result = after(event, previousResult)
					if (result !== undefined) return result
					return previousResult
				}
			}

			result = after(event, previousResult)
			if (result !== undefined) return result
			return previousResult
		}
	}

	return pipe
}