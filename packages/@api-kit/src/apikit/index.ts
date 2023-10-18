import { GenericEndpoint } from '$/endpoint/generic'
import { Endpoint } from '../endpoint'
import { EndpointRequestInput } from '../endpoint/callback'
import { EndpointPromise } from './endpoint-promise'

export type APIKit<E extends Endpoint> = [E] extends [Endpoint<infer I, infer R>] ?
	(...args: EndpointRequestInput<I>) => EndpointPromise<R>
	: never

export type GenericAPIKit<E extends GenericEndpoint> =
	ReturnType<APIKit<ReturnType<E>>>