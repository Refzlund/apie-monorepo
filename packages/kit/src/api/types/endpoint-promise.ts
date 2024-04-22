import { APIResponse } from '@apie/responses'
import { Intersect, Simplify } from '../../types/utility'
import { KitResponse, ToKitResponse } from './kitresponse'
import { AnyResponse, AnyServerError } from '@apie/responses/types'

type InferKitResponseFn<R> =
	R extends KitResponse<infer _, infer _, infer _, infer Fn>
	? Fn
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: R extends KitResponse<any, any, any, infer Fn>
	? Fn
	: never


type FilterResponse<R extends KitResponse, K extends string> =
	R extends KitResponse<infer _, infer _, infer _, infer Fn>
	? (K extends Fn ? R : never)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: R extends KitResponse<any, any, any, infer Fn>
	? (K extends Fn ? R : never) : never

type _$Promise<K extends unknown[], R extends KitResponse> =
	[R] extends [KitResponse] ? {
		[Key in InferKitResponseFn<R>]:
		<const T>(
			cb: (response: FilterResponse<R, Key>) => T
		) =>
			& Promise<[...K, Awaited<T> | undefined]>
			& $Promise<[...K, Awaited<T> | undefined], R>
	} : never

type $Promise<K extends unknown[], R extends KitResponse> = {
	[Key in keyof _$Promise<K, R>]: _$Promise<K, R>[Key]
}

type _EndpointPromise<
	R extends KitResponse = KitResponse
	> = [R] extends [KitResponse] ? (Promise<R> & Simplify<Intersect<{
	/** Returns the value of the given callback */
	$: $Promise<[], R>
} & {
	[Key in InferKitResponseFn<R>]:
		(cb: (response: FilterResponse<R, Key>) => void) => EndpointPromise<R>
}>>) : never


export type EndpointPromise<R extends APIResponse | KitResponse = AnyResponse> = {
	[Key in keyof _EndpointPromise<ToKitResponse<R | AnyServerError>>]:
		_EndpointPromise<ToKitResponse<R | AnyServerError>>[Key]
}