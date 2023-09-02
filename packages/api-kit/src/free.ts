// Testing some syntaxes.

import type { DeepWriteable, Simplify, Intersect, UnknownRecord, Flatten, Flat, MaybePromise } from './types/utility'
import type { RequestEvent } from '@sveltejs/kit'
import { KitResponse } from './http'
import { BadRequest, Ok } from './response'
import { Created } from './response/types'
import { ToJSON } from './types/json'


type Endpoint<
	Input extends KitRequestInput = {},
	Responses extends KitResponse<number, boolean> | unknown = unknown,
> = {}

interface KitRequestInput {
	query?: UnknownRecord
	body?: UnknownRecord | unknown[]
}

/** KitEvent simplifies the _KitEvent by hiding the intenral type for intellisense */
type _KitEvent<Input extends KitRequestInput = {}> = Omit<RequestEvent, 'request'> & {
	fetch: {
		/**
		  	KitEvent\<infer K> does not work for standalone endpoint functions.
		 	This value IS `undefined` and is used to infer types for `KitEvent`.
		 	@usage `InferKitEvent<E>` where `E extends KitEvent`
		*/
		TKitEventInput: ToJSON<Input> | undefined
	}
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
	[Key in keyof _KitEvent]: _KitEvent<Input>[Key]
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
type InferKitEvent<T extends KitEvent & Locals> = 
	{
		body: NonNullable<T['fetch']['TKitEventInput']>['body'],
		locals: Simplify<T['locals']>
		query: NonNullable<T['fetch']['TKitEventInput']>['query']
	}


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
	type E = KitEvent<Input>
	type G<R extends EndpointFunctionResponse<unknown>[]> = Simplify<GetLocals<R>>

	return function <
		L1 extends G<[R0]>,
		L2 extends G<[R0, R1]>, 
		L3 extends G<[R0, R1, R2]>,
		L4 extends G<[R0, R1, R2, R3]>,
		L5 extends G<[R0, R1, R2, R3, R4]>,

		E0 extends E,
		E1 extends E,
		E2 extends E,
		E3 extends E,
		E4 extends E,
		E5 extends E,
		
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

		type Responses = Endpoint<ToJSON<Input>, 
			| Extract<R0, KitResponse>
			| Extract<R1, KitResponse>
			| Extract<R2, KitResponse>
			| Extract<R3, KitResponse>
			| Extract<R4, KitResponse>
			| Extract<R5, KitResponse>
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
	query: {
		seasonId: number
	}
	body: {
		name: string
		date: Date
	}
}

class User {
	name: string
	user: User
}

function example1(event: KitEvent & Locals<{ yas: 'heehee' }>) {
	// * Make requirements using Locals<{ key: value }>
	return {
		test: 1 as const,
		user: {} as User
	}
}

async function parseJSON<E extends KitEvent>(event: E) {
	type T = InferKitEvent<E>
	return {
		json: await event.request.json() as T['body'],
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
		// event.locals.test
		// ^?

		return {
			another: 'one'
		}
	}
)

