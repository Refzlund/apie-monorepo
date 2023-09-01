// Testing some syntaxes.

import type { DeepWriteable, Simplify, Intersect, UnknownRecord, Flatten, Flat } from '../types/utility'
import type { RequestEvent } from '@sveltejs/kit'
import { KitResponse } from './http'
import { BadRequest, Ok } from './response'
import { Created } from './response/types'

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

type EndpointFunction<
	E extends KitEvent,
	L extends Locals,
	R extends EndpointFunctionResponse<unknown>
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
		const E0 extends E,  const R0 extends R, L0 extends Locals,
		const E1 extends E0, const R1 extends R, L1 extends Locals<G<[R0]>>,
		const E2 extends E1, const R2 extends R, L2 extends Locals<G<[R0, R1]>>, 
		const E3 extends E2, const R3 extends R, L3 extends Locals<G<[R0, R1, R2]>>
	>(
		a0: EndpointFunction<E0, L0, R0>,
		a1?: EndpointFunction<E1, L1, R1>,
		a2?: EndpointFunction<E2, L2, R2>,
		a3?: EndpointFunction<E3, L3, R3>,
	) {

		type Responses = Endpoint<Simplify<Input>, 
			| Extract<R3, KitResponse>
			| Extract<R2, KitResponse>
			| Extract<R1, KitResponse>
			| Extract<R0, KitResponse>
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

function test(event: KitEvent & Locals<{ yas?: 'heehee' }>) {
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
		event.locals.test
		// ^?

		return {
			another: 'one'
		}
	},
	(event) => {
		return Ok()
	}
)

