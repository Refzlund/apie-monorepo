import type { MaybePromise, MaybeArray, UnknownRecord, Writable } from '@api/utility/types'
import { type APIResponse } from '@api/responses/types'
import { InternalServerError } from '@api/responses'

type NonFunction =
	| string | number | bigint | boolean | symbol
	| null | undefined | void
	| APIResponse | UnknownRecord

type PipeFn<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Event extends UnknownRecord = any, Input = any, Result extends NonFunction = any
> =
	| ((event: Event, input: Input) => MaybePromise<Result>)

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

interface Options<T extends UnknownRecord> {
	/** Functions to run before every pipeline */
	before?: MaybeArray<((event: T) => unknown)>

	/** Functions to run after every pipeline (except if it trows) */
	after?: MaybeArray<((event: T, result: unknown) => unknown)>

	/** Functions to always run after every pipeline */
	finally?: ((event: T, result?: unknown, error?: unknown) => unknown)[]

	catch?(event: T, error: unknown): APIResponse
}

export function createEventPipe<T extends UnknownRecord = {}>(
	options: Options<T> = {}
) {
	type Fn<PreviousResult, Result extends NonFunction> =
		| PipeFn<T, GetPipeContent<PreviousResult>, Result>

	function errored(event: T, error: unknown) {
		try {
			options?.finally?.forEach(fn => fn(event, undefined, error))
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
			options?.finally?.forEach(fn => fn(event, result, undefined))
		} catch (error) {
			return errored(event, error)
		}
	}


	//#region Pipe implementation
	type Pipe<Pn extends PipeFn, Input, Pall extends PipeFn> =
		[void & number] | [void] extends [Input] ? (
			(event: T) => Promise<GetPipeContent<Pn> | ParamReturnResponse<Pall>>
		) : (
			(event: T, input: Input) => Promise<GetPipeContent<Pn> | ParamReturnResponse<Pall>>
		)

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		Input
	>(
		p0: P0 | R0
	): Pipe<P0, Input, P0>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1
	): Pipe<P1, Input, P0 | P1>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2
	): Pipe<P2, Input, P0 | P1 | P2>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3
	): Pipe<P3, Input, P0 | P1 | P2 | P3>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4
	): Pipe<P4, Input,
		P0 | P1 | P2 | P3 | P4
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5
	): Pipe<P5, Input,
		P0 | P1 | P2 | P3 | P4 | P5
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6
	): Pipe<P6, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7
	): Pipe<P7, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8
	): Pipe<P8, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9
	): Pipe<P9, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10
	): Pipe<P10, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
	): Pipe<P11, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12
	): Pipe<P12, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		P13 extends Fn<GetPipeContent<P12>, R13>, const R13 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13
	): Pipe<P13, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		P13 extends Fn<GetPipeContent<P12>, R13>, const R13 extends NonFunction,
		P14 extends Fn<GetPipeContent<P13>, R14>, const R14 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14
	): Pipe<P14, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		P13 extends Fn<GetPipeContent<P12>, R13>, const R13 extends NonFunction,
		P14 extends Fn<GetPipeContent<P13>, R14>, const R14 extends NonFunction,
		P15 extends Fn<GetPipeContent<P14>, R15>, const R15 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15
	): Pipe<P15, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		P13 extends Fn<GetPipeContent<P12>, R13>, const R13 extends NonFunction,
		P14 extends Fn<GetPipeContent<P13>, R14>, const R14 extends NonFunction,
		P15 extends Fn<GetPipeContent<P14>, R15>, const R15 extends NonFunction,
		P16 extends Fn<GetPipeContent<P15>, R16>, const R16 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16
	): Pipe<P16, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		P13 extends Fn<GetPipeContent<P12>, R13>, const R13 extends NonFunction,
		P14 extends Fn<GetPipeContent<P13>, R14>, const R14 extends NonFunction,
		P15 extends Fn<GetPipeContent<P14>, R15>, const R15 extends NonFunction,
		P16 extends Fn<GetPipeContent<P15>, R16>, const R16 extends NonFunction,
		P17 extends Fn<GetPipeContent<P16>, R17>, const R17 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17
	): Pipe<P17, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		P13 extends Fn<GetPipeContent<P12>, R13>, const R13 extends NonFunction,
		P14 extends Fn<GetPipeContent<P13>, R14>, const R14 extends NonFunction,
		P15 extends Fn<GetPipeContent<P14>, R15>, const R15 extends NonFunction,
		P16 extends Fn<GetPipeContent<P15>, R16>, const R16 extends NonFunction,
		P17 extends Fn<GetPipeContent<P16>, R17>, const R17 extends NonFunction,
		P18 extends Fn<GetPipeContent<P17>, R18>, const R18 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18
	): Pipe<P18, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		P13 extends Fn<GetPipeContent<P12>, R13>, const R13 extends NonFunction,
		P14 extends Fn<GetPipeContent<P13>, R14>, const R14 extends NonFunction,
		P15 extends Fn<GetPipeContent<P14>, R15>, const R15 extends NonFunction,
		P16 extends Fn<GetPipeContent<P15>, R16>, const R16 extends NonFunction,
		P17 extends Fn<GetPipeContent<P16>, R17>, const R17 extends NonFunction,
		P18 extends Fn<GetPipeContent<P17>, R18>, const R18 extends NonFunction,
		P19 extends Fn<GetPipeContent<P18>, R19>, const R19 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18, p19: P19 | R19
	): Pipe<P19, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18 | P19
	>

	function pipe<
		P0 extends PipeFn<T, Input, R0>, const R0 extends NonFunction,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction,
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction,
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction,
		P13 extends Fn<GetPipeContent<P12>, R13>, const R13 extends NonFunction,
		P14 extends Fn<GetPipeContent<P13>, R14>, const R14 extends NonFunction,
		P15 extends Fn<GetPipeContent<P14>, R15>, const R15 extends NonFunction,
		P16 extends Fn<GetPipeContent<P15>, R16>, const R16 extends NonFunction,
		P17 extends Fn<GetPipeContent<P16>, R17>, const R17 extends NonFunction,
		P18 extends Fn<GetPipeContent<P17>, R18>, const R18 extends NonFunction,
		P19 extends Fn<GetPipeContent<P18>, R19>, const R19 extends NonFunction,
		P20 extends Fn<GetPipeContent<P19>, R20>, const R20 extends NonFunction,
		Input
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18, p19: P19 | R19, p20: P20 | R20
	): Pipe<P20, Input,
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18 | P19 | P20
	>
	//#endregion

	function pipe(...params: Array<NonFunction | PipeFn<T, unknown, NonFunction>>) {
		return async function pipedFunction(event: T, input: unknown = undefined) {
			let previousResult = input

			let result = before(event)
			if (result !== undefined) return result

			for (const pm of params) {
				if (typeof pm !== 'function') {
					previousResult = pm
					continue
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