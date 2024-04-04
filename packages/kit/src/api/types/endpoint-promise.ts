import { APIResponse } from '@apie/responses'
import { Intersect, Simplify } from '../../types/utility'

type InferAPIResponseFn<R> =
	R extends APIResponse<infer _, infer _, infer _, infer Fn>
	? Fn
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: R extends APIResponse<any, any, any, infer Fn>
	? Fn
	: never


type FilterResponse<R extends APIResponse, K extends string> =
	R extends APIResponse<infer _, infer _, infer _, infer Fn>
	? (K extends Fn ? R : never)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: R extends APIResponse<any, any, any, infer Fn>
	? (K extends Fn ? R : never) : never

type _$Promise<K extends unknown[], R extends APIResponse> =
	[R] extends [APIResponse] ? {
		[Key in InferAPIResponseFn<R>]:
		<const T>(
			cb: (response: FilterResponse<R, Key>) => T
		) =>
			& Promise<[...K, Awaited<T> | undefined]>
			& $Promise<[...K, Awaited<T> | undefined], R>
	} : never

type $Promise<K extends unknown[], R extends APIResponse> = {
	[Key in keyof _$Promise<K, R>]: _$Promise<K, R>[Key]
}

type _EndpointPromise<
	R extends APIResponse = APIResponse
> = [R] extends [APIResponse] ? (Promise<R> & Simplify<Intersect<{
	/** Returns the value of the given callback */
	$: $Promise<[], R>
} & {
		[Key in InferAPIResponseFn<R>]:
		(cb: (response: FilterResponse<R, Key>) => void) => EndpointPromise<R>
	}>>) : never

export type EndpointPromise<R extends APIResponse> = {
	[Key in keyof _EndpointPromise<R>]: _EndpointPromise<R>[Key]
}