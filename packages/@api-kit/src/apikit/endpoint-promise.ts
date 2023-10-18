import { InferKitResposneFn, KitResponse } from '../response/kitresponse'
import { Intersect, Simplify } from '../types/utility'


type FilterResponse<R extends KitResponse, K extends string> =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	R extends KitResponse<infer A, infer B, infer C, infer Fn> ?
	K extends Fn ? R : never : never

type _$Promise<K extends unknown[], R extends KitResponse> =
	[R] extends [KitResponse] ? {
		[Key in InferKitResposneFn<R>]:
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
		[Key in InferKitResposneFn<R>]:
		(cb: (response: FilterResponse<R, Key>) => void) => EndpointPromise<R>
	}>>) : never

export type EndpointPromise<R extends KitResponse> = {
	[Key in keyof _EndpointPromise<R>]: _EndpointPromise<R>[Key]
}