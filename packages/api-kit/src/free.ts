// Testing some syntaxes.

import type { Simplify, UnknownRecord, Flat, MaybePromise, brand } from './types/utility'
import type { RequestEvent } from '@sveltejs/kit'
import { ExtractKitResponse, InferKitResposneFn, KitResponse, UnknownKitResponse } from './response/kitresponse'
import { BadRequest, OK } from './response'
import { ToJSON } from './types/json'

type ReqInit = Omit<RequestInit, 'body'>

type EndpointRequestInput<
	Body extends KitRequestInput['body'],
	Query extends KitRequestInput['query']
> = Extract<Body, undefined> extends never ?
	Extract<Query, undefined> extends never ?
	[body: Readonly<Body>, opts: ReqInit & { query: Query }]
	: [body: Readonly<Body>, opts?: ReqInit & { query?: Query }]
	: [body?: Readonly<Body>, opts?: ReqInit & { query?: Query }]

type Endpoint<
	Input extends KitRequestInput = {},
	Responses extends KitResponse<number, boolean> = UnknownKitResponse,
> = Responses & { [brand]: Input }



// type Endpoint<
// 	Input extends KitRequestInput = {},
// 	Responses extends KitResponse<number, boolean> = UnknownKitResponse,
// > = (...args: EndpointRequestInput<Input['body'], Input['query']>) =>
// 		EndpointPromise<Responses>

type EndpointPromise<
	Responses extends KitResponse<number, boolean, unknown, string> = UnknownKitResponse
> = {
		[Key in InferKitResposneFn<Responses>]: (
			callback: (
				response: ExtractKitResponse<Responses, Key>
			) => void
		) => EndpointPromise<Responses>
} & {
	/** returns a store */
	$(): void
} & {
	/** Returns the value of the given callback */	
	$: {
		[Key in InferKitResposneFn<Responses>]: () => void
	}
}



interface KitRequestInput {
	query?: UnknownRecord
	body?: UnknownRecord | unknown[]
}

/** KitEvent simplifies the _KitEvent by hiding the intenral type for intellisense */
type _KitEvent<Input extends KitRequestInput> = Omit<RequestEvent, 'request'> & {
	[brand]: Input 
	request: {
		json: () => Promise<ToJSON<Input['body']>>
	} & Omit<RequestEvent['request'], 'json'>
	url: {
		searchParams: {
			get: <T extends keyof Input['query']>(s: T) => string | null,
			getAll: <T extends keyof Input['query']>(s: T) => Array<string>,
			has: <T extends keyof Input['query']>(s: T) => boolean
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KitEvent<Input extends KitRequestInput = any> = {
	[Key in keyof _KitEvent<Input>]: _KitEvent<Input>[Key]
}

/**
	KitEvent is not "directly" inferred (\<infer K>), 
	because it doesn't work for a stand-alone function🤷

	@usage
	```ts
	async function parseJSON<E extends KitEvent & Locals>(event: E) {
		type T = InferKitEvent<E>
		return {
			json: await event.request.json() as T['body'] 
		}
	}
	```
*/
type InferKitEvent<
	T extends KitEvent,
	JSON extends boolean = true,
	Local extends boolean = true
> = T extends KitEvent<infer K> ?
	(JSON extends true
		? ToJSON<NonNullable<K>>
		: NonNullable<K>
	) & (Local extends true ? { locals: Simplify<T['locals']> } : {}) : never


type Locals<L extends Record<string | number | symbol, unknown> = {}> = { locals: L }

type EndpointFn<
	Input extends KitRequestInput = {},
	L extends Record<string | number | symbol, unknown> = {},
	R extends EndpointFunctionResponse<unknown> = EndpointFunctionResponse<unknown>
> = (event: KitEvent<Input> & Locals<L>) => MaybePromise<R>

type EndpointFunctionResponse<T> =
	| KitResponse
	| Record<string | number | symbol, T>
	| ((...args: unknown[]) => EndpointFunctionResponse<T>)
	| void


/** GetLocals */
type GetLocals<
	R extends EndpointFunctionResponse<unknown>[]
> = Flat<Exclude<R[number], Function | KitResponse | undefined>> & {}

function endpoint<Input extends KitRequestInput = {}>(
	event?: KitEvent<Input>
) {
	type R<T = unknown> = EndpointFunctionResponse<T>
	type G<R extends EndpointFunctionResponse<unknown>[]> = Simplify<GetLocals<R>>
	
	return function <
		L1 extends G<[R0]>,
		L2 extends G<[R0, R1]>, 
		L3 extends G<[R0, R1, R2]>,
		L4 extends G<[R0, R1, R2, R3]>,
		L5 extends G<[R0, R1, R2, R3, R4]>,

		const R0 extends R = never, const R1 extends R = never,
		const R2 extends R = never, const R3 extends R = never,
		const R4 extends R = never, const R5 extends R = never,
	>(
		a0: EndpointFn<Input, {}, R0>,
		a1?: EndpointFn<Input, L1, R1>,
		a2?: EndpointFn<Input, L2, R2>,
		a3?: EndpointFn<Input, L3, R3>,
		a4?: EndpointFn<Input, L4, R4>,
		a5?: EndpointFn<Input, L5, R5>,
	) {
		type K =
			| KitResponse<number, boolean, unknown, string>
			| KitResponse<number, boolean, undefined, string>
		
		type Responses = Endpoint<ToJSON<Input>,
			| Extract<R0, K>
			| Extract<R1, K>
			| Extract<R2, K>
			| Extract<R3, K>
			| Extract<R4, K>
			| Extract<R5, K>
		>

		type EndpointReturn = Responses

		const fn = function(event: KitEvent) {

		}

		if (event)
			return fn(event) as unknown as EndpointReturn
		return fn as unknown as EndpointReturn

	}
}

interface Post {
	query?: {
		seasonId: number
	}
	body: {
		name: string
		date: Date
	}
}

class User {
	name: string = ''
	// user: User = new User()
}

function example1(event: KitEvent & Locals<{ yas: 'heehee' }>) {
	// * Make requirements using Locals<{ key: value }>
	return {
		test: 1 as const,
		user: {} as User
	}
}

async function parseJSON<E extends KitEvent>(event: E) {
	type Input = InferKitEvent<E>
	return {
		json: await event.request.json() as Input['body'],
	}
}

export const POST = endpoint<Post>()(
	parseJSON,
	(event) => {
		let value = 0
		value += 2
		
		if(value == 1)
			return BadRequest({ mhm: true })
		if (value == 2)
			return BadRequest({ oohooNooee: 6969 })
		
		return {
			yas: 'heehee'
		}
	},
	example1,
	(event) => {
		type T = InferKitEvent<typeof event>

		const str: string = event.locals.yas

		return OK({
			no: str as T['body']['name'],
			another: str,
			user: new User()
		})
	},
	() => OK()
)

// const res = POST({ name: 'yas', date: '' })

const PUT = <T extends Post>(e: KitEvent<T>) => endpoint(e)(
	parseJSON,
	(event) => {
		return OK({
			b: event.locals.json,
			q: {} as T['query']
		}) 
	}
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericEndpoint = (event: KitEvent) => Endpoint<any, any>

type InferGenericEndpoint<T extends GenericEndpoint> =
	InferKitEvent<Parameters<T>[0], false, false>
type InferBody<T extends GenericEndpoint> = InferGenericEndpoint<T>['body']
type InferQuery<T extends GenericEndpoint> = InferGenericEndpoint<T>['query']


// type R0 = <
// 	const B extends InferBody<typeof PUT>,
// 	const Q extends InferQuery<typeof PUT>
// >(...args: EndpointRequestInput<B, Q>) =>
// 	ReturnType<ReturnType<typeof PUT<{ body: B, query: Q }>>>

// const x = {} as R0

// const val = x({ name: 'Bob', date: new Date() }, { query: { seasonId: 123 } })
// val

