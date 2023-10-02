import { Endpoint } from '.'
import { InferKitEvent, KitEvent } from './event'

type GenericEndpoint = (event: KitEvent) => Endpoint
type InferGenericEndpoint<T extends GenericEndpoint> =
	InferKitEvent<Parameters<T>[0], false, false>

export type InferBody<T extends GenericEndpoint> = InferGenericEndpoint<T>['body']
export type InferQuery<T extends GenericEndpoint> = InferGenericEndpoint<T>['query']