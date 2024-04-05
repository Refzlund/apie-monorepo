import type { MaybePromise, UnknownRecord, Nil, IsUnknownOrNever, FilterNil } from '@apie/utility/types'
import { ArbitraryType, ExitValue, ParamReturnResponse, PipeInput, PipeOrValue } from './helper'
import { pipe } from '$/pipe'
import { Input } from './utility'
import { APIResponse } from '@apie/responses'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PipeType<T extends Pipe<any>> = T extends Pipe<infer I> ? I : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PipelineResult<T extends Pipeline<any>> = T extends Pipeline<
	() => Promise<infer I>
> ? I : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PipelineResponse<T extends Pipeline<any>> =
	Extract<PipelineResult<T>, APIResponse>


export type PipeFn<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Event extends UnknownRecord = any, Input = any, Result = any
> =
	| ((event: Event, input: Input) => MaybePromise<Result>)

export type NestedPipeFn<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Event extends UnknownRecord = any, Input = any, Result = any
> =
	{
		[pipe]: true,
		(event: Event, input: Input): MaybePromise<Result>
	}

// @ts-expect-error We force a `Pipeline<T>` type
export interface Pipeline<T extends PipeFn> extends T {
	[pipe]: true
	_: Input<T>
}

type PipeResult<
	T extends UnknownRecord,
	Pn extends PipeFn | Nil,
	Rn extends PipeFn | ArbitraryType | Nil,
	Input,
	Pall extends PipeFn | Nil
> =
	(
		IsUnknownOrNever<Input> extends true ? (
			Pipeline<(event: T) => Promise<
				| PipeOrValue<Pn, Rn>
				| ParamReturnResponse<Pall>
				| ExitValue<Pall>
			>>
		) : (
			undefined extends Input ? (
				Pipeline<
					(event: T, input?: Input | void) =>
						Promise<PipeOrValue<Pn, Rn> | ParamReturnResponse<Pall | ExitValue<Pall>>>
				>
			) : Pipeline<
				(event: T, input: Input) => 
					Promise<PipeOrValue<Pn, Rn> | ParamReturnResponse<Pall> | ExitValue<Pall>>
			>
		)
	)

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

export interface Pipe<T extends UnknownRecord, Add = {}> {
	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType
	>(
		p0: P0 | R0
	): PipeResult<T, P0, R0, PipeInput<P0, R0>,
		| FilterNil<P0>
	> & Add

	<
		Input,
		const P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		const P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1
	): PipeResult<T, P1, R1, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2
	): PipeResult<T, P2, R2, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3,
	): PipeResult<T, P3, R3, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3>
	> & Add
	
	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4
	): PipeResult<T, P4, R4, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5
	): PipeResult<T, P5, R5, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6
	): PipeResult<T, P6, R6, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7
	): PipeResult<T, P7, R7, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8
	): PipeResult<T, P8, R8, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9
	): PipeResult<T, P9, R9, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10
	): PipeResult<T, P10, R10, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11
	): PipeResult<T, P11, R11, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12
	): PipeResult<T, P12, R12, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType,
		P13 extends Nil | PipeFn<T, PipeOrValue<P12, R12>, any>, const R13 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12, p13: P13 | R13
	): PipeResult<T, P13, R13, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12> | FilterNil<P13>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType,
		P13 extends Nil | PipeFn<T, PipeOrValue<P12, R12>, any>, const R13 extends ArbitraryType,
		P14 extends Nil | PipeFn<T, PipeOrValue<P13, R13>, any>, const R14 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12, p13: P13 | R13, p14: P14 | R14
	): PipeResult<T, P14, R14, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12> | FilterNil<P13> | FilterNil<P14>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType,
		P13 extends Nil | PipeFn<T, PipeOrValue<P12, R12>, any>, const R13 extends ArbitraryType,
		P14 extends Nil | PipeFn<T, PipeOrValue<P13, R13>, any>, const R14 extends ArbitraryType,
		P15 extends Nil | PipeFn<T, PipeOrValue<P14, R14>, any>, const R15 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12, p13: P13 | R13, p14: P14 | R14,
		p15: P15 | R15
	): PipeResult<T, P15, R15, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12> | FilterNil<P13> | FilterNil<P14>
		| FilterNil<P15>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType,
		P13 extends Nil | PipeFn<T, PipeOrValue<P12, R12>, any>, const R13 extends ArbitraryType,
		P14 extends Nil | PipeFn<T, PipeOrValue<P13, R13>, any>, const R14 extends ArbitraryType,
		P15 extends Nil | PipeFn<T, PipeOrValue<P14, R14>, any>, const R15 extends ArbitraryType,
		P16 extends Nil | PipeFn<T, PipeOrValue<P15, R15>, any>, const R16 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12, p13: P13 | R13, p14: P14 | R14,
		p15: P15 | R15, p16: P16 | R16
	): PipeResult<T, P16, R16, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12> | FilterNil<P13> | FilterNil<P14>
		| FilterNil<P15> | FilterNil<P16>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType,
		P13 extends Nil | PipeFn<T, PipeOrValue<P12, R12>, any>, const R13 extends ArbitraryType,
		P14 extends Nil | PipeFn<T, PipeOrValue<P13, R13>, any>, const R14 extends ArbitraryType,
		P15 extends Nil | PipeFn<T, PipeOrValue<P14, R14>, any>, const R15 extends ArbitraryType,
		P16 extends Nil | PipeFn<T, PipeOrValue<P15, R15>, any>, const R16 extends ArbitraryType,
		P17 extends Nil | PipeFn<T, PipeOrValue<P16, R16>, any>, const R17 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12, p13: P13 | R13, p14: P14 | R14,
		p15: P15 | R15, p16: P16 | R16, p17: P17 | R17
	): PipeResult<T, P17, R17, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12> | FilterNil<P13> | FilterNil<P14>
		| FilterNil<P15> | FilterNil<P16> | FilterNil<P17>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType,
		P13 extends Nil | PipeFn<T, PipeOrValue<P12, R12>, any>, const R13 extends ArbitraryType,
		P14 extends Nil | PipeFn<T, PipeOrValue<P13, R13>, any>, const R14 extends ArbitraryType,
		P15 extends Nil | PipeFn<T, PipeOrValue<P14, R14>, any>, const R15 extends ArbitraryType,
		P16 extends Nil | PipeFn<T, PipeOrValue<P15, R15>, any>, const R16 extends ArbitraryType,
		P17 extends Nil | PipeFn<T, PipeOrValue<P16, R16>, any>, const R17 extends ArbitraryType,
		P18 extends Nil | PipeFn<T, PipeOrValue<P17, R17>, any>, const R18 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12, p13: P13 | R13, p14: P14 | R14,
		p15: P15 | R15, p16: P16 | R16, p17: P17 | R17, p18: P18 | R18
	): PipeResult<T, P18, R18, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12> | FilterNil<P13> | FilterNil<P14>
		| FilterNil<P15> | FilterNil<P16> | FilterNil<P17> | FilterNil<P18>
	> & Add

	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType,
		P13 extends Nil | PipeFn<T, PipeOrValue<P12, R12>, any>, const R13 extends ArbitraryType,
		P14 extends Nil | PipeFn<T, PipeOrValue<P13, R13>, any>, const R14 extends ArbitraryType,
		P15 extends Nil | PipeFn<T, PipeOrValue<P14, R14>, any>, const R15 extends ArbitraryType,
		P16 extends Nil | PipeFn<T, PipeOrValue<P15, R15>, any>, const R16 extends ArbitraryType,
		P17 extends Nil | PipeFn<T, PipeOrValue<P16, R16>, any>, const R17 extends ArbitraryType,
		P18 extends Nil | PipeFn<T, PipeOrValue<P17, R17>, any>, const R18 extends ArbitraryType,
		P19 extends Nil | PipeFn<T, PipeOrValue<P18, R18>, any>, const R19 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12, p13: P13 | R13, p14: P14 | R14,
		p15: P15 | R15, p16: P16 | R16, p17: P17 | R17, p18: P18 | R18, p19: P19 | R19,
	): PipeResult<T, P19, R19, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12> | FilterNil<P13> | FilterNil<P14>
		| FilterNil<P15> | FilterNil<P16> | FilterNil<P17> | FilterNil<P18> | FilterNil<P19>
	> & Add
	
	<
		Input,
		P0 extends Nil | PipeFn<T, Input, any>, const R0 extends ArbitraryType,
		P1 extends Nil | PipeFn<T, PipeOrValue<P0, R0>, any>, const R1 extends ArbitraryType,
		P2 extends Nil | PipeFn<T, PipeOrValue<P1, R1>, any>, const R2 extends ArbitraryType,
		P3 extends Nil | PipeFn<T, PipeOrValue<P2, R2>, any>, const R3 extends ArbitraryType,
		P4 extends Nil | PipeFn<T, PipeOrValue<P3, R3>, any>, const R4 extends ArbitraryType,
		P5 extends Nil | PipeFn<T, PipeOrValue<P4, R4>, any>, const R5 extends ArbitraryType,
		P6 extends Nil | PipeFn<T, PipeOrValue<P5, R5>, any>, const R6 extends ArbitraryType,
		P7 extends Nil | PipeFn<T, PipeOrValue<P6, R6>, any>, const R7 extends ArbitraryType,
		P8 extends Nil | PipeFn<T, PipeOrValue<P7, R7>, any>, const R8 extends ArbitraryType,
		P9 extends Nil | PipeFn<T, PipeOrValue<P8, R8>, any>, const R9 extends ArbitraryType,
		P10 extends Nil | PipeFn<T, PipeOrValue<P9, R9>, any>, const R10 extends ArbitraryType,
		P11 extends Nil | PipeFn<T, PipeOrValue<P10, R10>, any>, const R11 extends ArbitraryType,
		P12 extends Nil | PipeFn<T, PipeOrValue<P11, R11>, any>, const R12 extends ArbitraryType,
		P13 extends Nil | PipeFn<T, PipeOrValue<P12, R12>, any>, const R13 extends ArbitraryType,
		P14 extends Nil | PipeFn<T, PipeOrValue<P13, R13>, any>, const R14 extends ArbitraryType,
		P15 extends Nil | PipeFn<T, PipeOrValue<P14, R14>, any>, const R15 extends ArbitraryType,
		P16 extends Nil | PipeFn<T, PipeOrValue<P15, R15>, any>, const R16 extends ArbitraryType,
		P17 extends Nil | PipeFn<T, PipeOrValue<P16, R16>, any>, const R17 extends ArbitraryType,
		P18 extends Nil | PipeFn<T, PipeOrValue<P17, R17>, any>, const R18 extends ArbitraryType,
		P19 extends Nil | PipeFn<T, PipeOrValue<P18, R18>, any>, const R19 extends ArbitraryType,
		P20 extends Nil | PipeFn<T, PipeOrValue<P19, R19>, any>, const R20 extends ArbitraryType
	>(
		p0: P0 | R0, p1: P1 | R1, p2: P2 | R2, p3: P3 | R3, p4: P4 | R4,
		p5: P5 | R5, p6: P6 | R6, p7: P7 | R7, p8: P8 | R8, p9: P9 | R9,
		p10: P10 | R10, p11: P11 | R11, p12: P12 | R12, p13: P13 | R13, p14: P14 | R14,
		p15: P15 | R15, p16: P16 | R16, p17: P17 | R17, p18: P18 | R18, p19: P19 | R19,
		p20: P20 | R20,
	): PipeResult<T, P20, R20, PipeInput<P0, R0>,
		| FilterNil<P0> | FilterNil<P1> | FilterNil<P2> | FilterNil<P3> | FilterNil<P4>
		| FilterNil<P5> | FilterNil<P6> | FilterNil<P7> | FilterNil<P8> | FilterNil<P9>
		| FilterNil<P10> | FilterNil<P11> | FilterNil<P12> | FilterNil<P13> | FilterNil<P14>
		| FilterNil<P15> | FilterNil<P16> | FilterNil<P17> | FilterNil<P18> | FilterNil<P19>
		| FilterNil<P20>
	> & Add
}