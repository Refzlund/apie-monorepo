type JsonType = boolean | number | string | null | undefined

type Jsonable = { toJSON(): unknown }

type InferToJSON<T extends Jsonable> =
	T extends { toJSON(): infer U } ? U extends object ? ToJSON<U> : U : never

type Jsonify<T> =
	T extends Function | symbol | undefined ? never :
	T extends Jsonable ? InferToJSON<T> :
	T extends JsonType ? T :
	T extends object ? {
		-readonly [K in keyof T as Jsonify<T[K]> extends never ? never : K]: Jsonify<T[K]>
	} : never

export type ToJSON<T extends object> = Jsonify<T>