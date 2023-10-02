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

export type Intersect<T> =
	(T extends unknown ? (x: T) => unknown : never) extends
	(x: infer R) => unknown ? R : never


type T0 = Flat<{
	asd: 123
	yas: undefined
} | {
	yas: 'heehee'
	asd: undefined
}>

type T1 = Intersect<T0>