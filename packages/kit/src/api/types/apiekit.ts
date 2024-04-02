import { GenericEndpoint } from '$/endpoint/generic'
import { APIResponse } from '@apie/responses/types'
import { EndpointRequestInput } from '$/endpoint/callback'
import { EndpointPromise } from './endpoint-promise'
import { Endpoint } from '$/endpoint'



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type APIEKit<E extends Endpoint<any, any>> =
	[E] extends [Endpoint<infer I, infer R>]
	? (...args: EndpointRequestInput<I>) => EndpointPromise<Extract<R, APIResponse>>
	: never

export type GenericAPIKit<E extends GenericEndpoint> =
	ReturnType<APIEKit<ReturnType<E>>>