import { IsUnknown } from './is-unknown'

export type IsUnknownOrNever<T> =
	[T] extends [never] ? true : IsUnknown<T>