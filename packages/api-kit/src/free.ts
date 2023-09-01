// Testing some syntaxes.

import type { DeepWriteable, Simplify, Intersect, UnknownRecord, Flatten, Flat } from './types/utility'
import type { RequestEvent } from '@sveltejs/kit'
import { KitResponse } from './http'
import { BadRequest, Ok } from './response'
import { Created } from './response/types'
import { ToJSON } from './types/json'

type Test = Simplify<RequestEvent>








type Endpoint<
	Input extends KitRequestInput = {},
	Responses extends KitResponse<number, boolean> | unknown = unknown,
> = {}

interface KitRequestInput {
	query?: UnknownRecord
	body?: UnknownRecord
}

type KitRequestEvent = Omit<RequestEvent, 'request'> & Omit<RequestEvent['request'], 'json'>
/** KitEvent simplifies the _KitEvent by hiding the intenral type for intellisense */
type _KitEvent<Input extends KitRequestInput = {}> = KitRequestEvent & {
	request: {
		json: () => Promise<Input['body']>
	}
	url: {
		searchParams: {
			get: <T extends keyof Input['query']>(s: T) => string | null,
			getAll: <T extends keyof Input['query']>(s: T) => Array<string>,
			has: <T extends keyof Input['query']>(s: T) => boolean
		}
	}
}
type KitEvent<Input extends KitRequestInput = {}> = {
	[Key in keyof _KitEvent]: _KitEvent[Key]
}






type Locals<L extends Record<string | number | symbol, unknown> = {}> = { locals: L }

type EndpointFn<
	E extends KitEvent = KitEvent,
	L extends Locals = Locals,
	R extends EndpointFunctionResponse<unknown> = EndpointFunctionResponse<unknown>
> = (event: E & L) => R

type EndpointFunctionResponse<T> =
	| KitResponse
	| Record<string | number | symbol, T>
	| ((...args: unknown[]) => EndpointFunctionResponse<T>)
	| void


/** GetLocals */
type GetLocals<
	R extends EndpointFunctionResponse<unknown>[]
	> = DeepWriteable<Flat<
		Exclude<R[number], Function | KitResponse | undefined>
	>>

function endpoint<Input extends KitRequestInput = {}>(
	event?: KitEvent<Input>
) {
	type R<T = unknown> = EndpointFunctionResponse<T>
	type E = KitEvent<Input>
	type G<R extends EndpointFunctionResponse<unknown>[]> = GetLocals<R>

	return function <
		L0 extends Locals,
		L1 extends Locals<G<[R0]>>,
		L2 extends Locals<G<[R0, R1]>>, 
		L3 extends Locals<G<[R0, R1, R2]>>,
		
		const R0 extends R = never, const R1 extends R = never,
		const R2 extends R = never, const R3 extends R = never,
	>(
		a0: EndpointFn<E, L0, R0>,
		a1?: EndpointFn<E, L1, R1>,
		a2?: EndpointFn<E, L2, R2>,
		a3?: EndpointFn<E, L3, R3>,
	) {

		type Responses = Endpoint<ToJSON<Input>, 
			| Extract<R0, KitResponse>
			| Extract<R1, KitResponse>
			| Extract<R2, KitResponse>
			| Extract<R3, KitResponse>
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

function test(event: KitEvent & Locals<{ yas: 'heehee' }>) {
	// * Make requirements using Locals<{ key?: value }>
	return {
		test: 1 as const
	}
}

export const POST = endpoint<Post>()(
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
	test,
	(event) => {
		// event.locals.test
		// ^?

		return {
			another: 'one'
		}
	},
	(event) => {
		return Ok({
			/** @type User */
			user: {} as User
		})
	}
)

