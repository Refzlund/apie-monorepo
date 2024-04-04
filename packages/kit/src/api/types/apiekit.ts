import { APIResponse } from '@apie/responses/types'
import { EndpointRequestInput } from '$/endpoint/types/callback'
import { EndpointPromise } from './endpoint-promise'
import { Endpoint } from '$/endpoint/endpoint-fn'
import { Method } from '../methods'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type APIEKit<E extends Endpoint<any, any>, K extends Method = Method> =
[E] extends [Endpoint<infer I, infer R>]
? (...args: EndpointRequestInput<I, K>) => EndpointPromise<Extract<R, APIResponse>>
: never

type ServerFile = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[Key in Method]?: Endpoint<any, any>
}

export type ServerAPIEKit<T extends ServerFile> = {
	[Key in Method as undefined extends T[Key] ? never : Key]:
	APIEKit<NonNullable<T[Key]>, Key>
}