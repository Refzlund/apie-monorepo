import type { MaybePromise } from '@apie/utility/types'
import type { PipeFn, Pipeline } from './pipe'
import type { APIResponse } from '@apie/responses/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Input<T extends Pipeline<any> | PipeFn> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Pipeline<(e: any, input: infer K) => any> ? K
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: T extends PipeFn<any, infer K> ? K
	: never 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Output<T extends Pipeline<any> | PipeFn> = 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Pipeline<(e: any, input: any) =>
		MaybePromise<infer K>> ? Exclude<K, APIResponse>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		: T extends PipeFn<any, any, infer K> ? Exclude<K, APIResponse>
		: never