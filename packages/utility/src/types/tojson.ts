type MaybeArray<T> = T | T[]

type JsonType = boolean | number | string | null | undefined

type Jsonable = { toJSON(): unknown }

type InferToJSON<T extends Jsonable> =
	T extends { toJSON(): infer U } ? U extends object ? ToJSON<U> : U : never

type Jsonify<T> =
	T extends Function | symbol | undefined ? never :
	T extends Jsonable ? InferToJSON<T> :
	T extends MaybeArray<JsonType> ? T :
	T extends object ? T extends Array<infer U> ? ToJSON<U>[] : {
		-readonly [K in keyof T as Jsonify<T[K]> extends never ? never : K]: Jsonify<T[K]>
	} : never

export declare const rawJSON: unique symbol 
export type ToJSON<T extends object | undefined | unknown> =
	T extends MaybeArray<
		undefined | string | number | boolean | symbol | FormData | Blob
	>
	? T
	: Jsonify<T>