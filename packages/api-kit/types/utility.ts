
interface SimplifyOptions {
	/**
	Do the simplification recursively.
	@default false
	*/
	deep?: boolean
}

// Flatten a type without worrying about the result.
type Flatten<
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

export type UnknownRecord = Record<string | number | symbol, unknown>

export type DeepWriteable<T> = Simplify<{
	-readonly [P in keyof T]: T[P] extends object ? DeepWriteable<T[P]> : T[P]
}>