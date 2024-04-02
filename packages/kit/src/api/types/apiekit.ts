import { APIResponse } from '@apie/responses/types'
import { EndpointRequestInput } from '$/endpoint/types/callback'
import { EndpointPromise } from './endpoint-promise'
import { Endpoint } from '$/endpoint/endpoint-fn'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type APIEKit<E extends Endpoint<any, any>> =
	[E] extends [Endpoint<infer I, infer R>]
	? (...args: EndpointRequestInput<I>) => EndpointPromise<Extract<R, APIResponse>>
	: never
