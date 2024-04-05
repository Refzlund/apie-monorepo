/* eslint-disable @typescript-eslint/no-explicit-any */

import { Nil, UnknownRecord } from '@apie/utility/types'
import { NestedPipeFn, PipeFn } from './pipe'
import { APIResponse } from '@apie/responses'
import { Exit } from '$/exit'

export type ArbitraryType =
	| string | number | bigint | boolean | symbol
	| null | undefined | void
	| APIResponse | UnknownRecord | Nil

/** Returns the APIResponse from a Pipe Parameter Function */
export type ParamReturnResponse<P extends PipeFn | Nil> =
	P extends PipeFn<infer _, infer _, infer R>
	? (R extends APIResponse ? R : never)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: P extends PipeFn<any, any, infer R>
	? (R extends APIResponse ? R : never)
	: never

export type PipeInput<P extends PipeFn | Nil, R> =
	[Nil] extends [P] ? (
		R extends PipeFn<infer _, infer Input, infer _> ? Input
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		: R extends PipeFn<any, infer Input, any> ? Input
		: never
	)
	: (
		P extends PipeFn<infer _, infer Input, infer _> ? Input
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		: P extends PipeFn<any, infer Input, any> ? Input
		: never
	)

type NestedPipeInference<T> =
	T extends NestedPipeFn<infer _, infer _, infer TReturn>
	? TReturn
	: T extends NestedPipeFn<any, any, infer TReturn>
	? TReturn
	: T

/** Returns the (non-APIResponse) content of the Pipe Parameter Function */
export type PipeOrValue<
	P extends Nil | PipeFn = Nil,
	R extends Nil | PipeFn | ArbitraryType = Nil,
> =
	[Nil] extends [P]
	? (
		R extends PipeFn<infer _, infer _, infer TReturn>
		? Exclude<NestedPipeInference<TReturn>, APIResponse | Exit>
		: R extends PipeFn<any, any, infer TReturn>
		? Exclude<NestedPipeInference<TReturn>, APIResponse | Exit>
		: Exclude<R, APIResponse | Exit>
	)
	: (
		P extends PipeFn<infer _, infer _, infer TReturn>
		? Exclude<NestedPipeInference<TReturn>, APIResponse | Exit>
		: P extends PipeFn<any, any, infer TReturn>
		? Exclude<NestedPipeInference<TReturn>, APIResponse | Exit>
		: never
	)

export type ExitValue<P extends PipeFn | Nil> =
	P extends PipeFn<infer _, infer _, infer R>
	? (R extends Exit<infer K> ? K : never)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: P extends PipeFn<any, any, infer R>
	? (R extends Exit<infer K> ? K : never)
	: never