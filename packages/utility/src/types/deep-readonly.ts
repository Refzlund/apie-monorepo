import { UnknownRecord } from '.'

export type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends UnknownRecord ? DeepReadonly<T[P]> : T[P]
}