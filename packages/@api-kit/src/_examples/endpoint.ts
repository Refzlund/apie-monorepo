/* eslint-disable @typescript-eslint/no-unused-vars */

import { Endpoint, endpoint } from '$/endpoint'
import { InferKitEvent, KitEvent, Locals } from '$/endpoint/event'
import { parseJSON } from '$/endpoint/functions'
import { BadRequest, OK } from '$/response'
import { isKitResponse } from '$/response/kitresponse'
import { MaybeAwaited } from '$/types/utility'

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

const nested = endpoint<Post, { yas: 'heehee' }>()(
	(event) => {
		if(event)
			return {
				yasNested: `yasNested: ${event.locals.yas}`,
			}
		return BadRequest()
	},
	(e) => {
		return OK({ message: 'It\'s ok!'})
	}
)

export const POST = endpoint<Post>()(
	nested,
	(e) => {
		return {
			a: true
		}
	},
	(e: KitEvent & Locals<{ a: true }>) => {

	},
	parseJSON,
	e => {
		e.locals.json
		return BadRequest()
	}
/*
	(event) => {
		let value = 0
		value += 2

		if (value == 1)
			return BadRequest({ mhm: true })
		if (value == 2)
			return BadRequest({ oohooNooee: 6969 })

		return {
			yas: 'heehee'
		}
	},
	// nested,
	example1,
	(event) => {
		type T = InferKitEvent<typeof event>

		const str: string = event.locals.yas

		return OK({
			yas: event.locals.yas,
			no: str as T['body']['name'],
			another: str,
			user: new User()
		})
	},
	({ locals }) => {

		return OK()
	}
*/
)