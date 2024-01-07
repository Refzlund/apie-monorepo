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

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3
	): (event: T) => Promise<GetPipeContent<P3> | ParamReturnResponse<P0 | P1 | P2 | P3>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4
	): (event: T) => Promise<GetPipeContent<P4> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5
	): (event: T) => Promise<GetPipeContent<P5> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6
	): (event: T) => Promise<GetPipeContent<P6> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6
	>>
	
	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7
	): (event: T) => Promise<GetPipeContent<P7> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7
	>>
	
	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8
	): (event: T) => Promise<GetPipeContent<P8> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8
	>>
	
	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9
	): (event: T) => Promise<GetPipeContent<P9> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9
	>>
	
	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
		P1 extends Fn<GetPipeContent<P0>, R1>, const R1 extends NonFunction,
		P2 extends Fn<GetPipeContent<P1>, R2>, const R2 extends NonFunction,
		P3 extends Fn<GetPipeContent<P2>, R3>, const R3 extends NonFunction,
		P4 extends Fn<GetPipeContent<P3>, R4>, const R4 extends NonFunction,
		P5 extends Fn<GetPipeContent<P4>, R5>, const R5 extends NonFunction,
		P6 extends Fn<GetPipeContent<P5>, R6>, const R6 extends NonFunction,
		P7 extends Fn<GetPipeContent<P6>, R7>, const R7 extends NonFunction,
		P8 extends Fn<GetPipeContent<P7>, R8>, const R8 extends NonFunction,
		P9 extends Fn<GetPipeContent<P8>, R9>, const R9 extends NonFunction,
		P10 extends Fn<GetPipeContent<P9>, R10>, const R10 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10
	): (event: T) => Promise<GetPipeContent<P10> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10
	>>
	
	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P11 extends Fn<GetPipeContent<P10>, R11>, const R11 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
	): (event: T) => Promise<GetPipeContent<P11> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P12 extends Fn<GetPipeContent<P11>, R12>, const R12 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12
	): (event: T) => Promise<GetPipeContent<P12> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13
	): (event: T) => Promise<GetPipeContent<P13> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P14 extends Fn<GetPipeContent<P13>, R14>, const R14 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14
	): (event: T) => Promise<GetPipeContent<P14> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P15 extends Fn<GetPipeContent<P14>, R15>, const R15 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15
	): (event: T) => Promise<GetPipeContent<P15> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P16 extends Fn<GetPipeContent<P15>, R16>, const R16 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16
	): (event: T) => Promise<GetPipeContent<P16> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P17 extends Fn<GetPipeContent<P16>, R17>, const R17 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17
	): (event: T) => Promise<GetPipeContent<P17> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P18 extends Fn<GetPipeContent<P17>, R18>, const R18 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18
	): (event: T) => Promise<GetPipeContent<P18> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P19 extends Fn<GetPipeContent<P18>, R19>, const R19 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18, p19: P19 | R19
	): (event: T) => Promise<GetPipeContent<P19> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18 | P19
	>>

	function pipe<
		const R0 extends NonFunction, P0 extends Fn<(input: T) => void, R0>,
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
		P20 extends Fn<GetPipeContent<P19>, R20>, const R20 extends NonFunction
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4, p5: P5 | R5,
		p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9, p10: P10 | R10, p11: P11 | R11,
		p12: P12 | R12, p13: P13 | R13, p14: P14 | R14, p15: P15 | R15, p16: P16 | R16,
		p17: P17 | R17, p18: P18 | R18, p19: P19 | R19, p20: P20 | R20
	): (event: T) => Promise<GetPipeContent<P20> | ParamReturnResponse<
		P0 | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
		P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18 | P19 | P20
	>>
	

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