import { Endpoint } from '.'
import { InferKitEvent, KitEvent } from './event'

export type GenericEndpoint = (event: KitEvent) => Endpoint
export type InferGenericEndpoint<T extends GenericEndpoint> =
	InferKitEvent<Parameters<T>[0], false, false>

export type InferBody<T extends GenericEndpoint> = InferGenericEndpoint<T>['body']
export type InferOptions<T extends GenericEndpoint> = Omit<InferGenericEndpoint<T>, 'body'>