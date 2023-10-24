export declare const locals: unique symbol
export declare const input: unique symbol
export declare const brand: unique symbol

interface SimplifyOptions {
	/**
		Do the simplification recursively.
		@default false
	*/
	deep?: boolean
}

// Flatten a type without worrying about the result.
export type Flatten<
	AnyType,
	Options extends SimplifyOptions = {},
> = Options['deep'] extends true
	? { [KeyType in keyof AnyType]: Simplify<AnyType[KeyType], Options> }
	: { [KeyType in keyof AnyType]: AnyType[KeyType] }

export type Simplify<
	AnyType,
	Options extends SimplifyOptions = {},
> = Flatten<AnyType> extends AnyType
	? Flatten<AnyType, Options>
	: AnyType

type DistributiveKeyOf<T> = T extends T ? keyof T : never

export type Flat<T> = {
	[K in DistributiveKeyOf<T>]:
		//distribute over T to support keys that are only present in one of its union members
		T extends T ?
		K extends keyof T ?
		T[K] : 
		never :
		never
}

export type UnknownRecord = Record<string | number | symbol, unknown>

export type DeepWriteable<T> = Simplify<{
	-readonly [P in keyof T]: T[P] extends object ? DeepWriteable<T[P]> : T[P]
}>

export type MaybePromise<T> = T | Promise<T>
export type MaybeAwaited<T> = T extends MaybePromise<infer U> ? U : T

export type RequiredKeys<T> = {
	[K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type Intersect<U> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
