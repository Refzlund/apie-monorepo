import { KitRequestInput } from './event'

type ReqInit = Omit<RequestInit, 'body'>

export type EndpointRequestInput<
	Body extends KitRequestInput['body'],
	Query extends KitRequestInput['query']
> = Extract<Body, undefined> extends never ?
	Extract<Query, undefined> extends never ?
	[body: Readonly<Body>, opts: ReqInit & { query: Query }]
	: [body: Readonly<Body>, opts?: ReqInit & { query?: Query }]
	: [body?: Readonly<Body>, opts?: ReqInit & { query?: Query }]