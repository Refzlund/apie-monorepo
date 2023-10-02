import { endpoint } from '$/endpoint'
import { InferKitEvent, KitEvent, Locals } from '$/endpoint/event'
import { parseJSON } from '$/endpoint/functions'
import { BadRequest, OK } from '$/response'

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

export const POST = endpoint<Post>()(
	parseJSON,
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
	({ locals }) => {

		return OK()
	}
)