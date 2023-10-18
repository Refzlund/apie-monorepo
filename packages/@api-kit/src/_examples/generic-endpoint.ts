/* eslint-disable @typescript-eslint/no-unused-vars */

import { endpoint } from '$/endpoint'
import { EndpointRequestInput as RQ, RequestOptions } from '$/endpoint/callback'
import { KitEvent, KitRequestInput } from '$/endpoint/event'
import { parseJSON } from '$/endpoint/functions'
import { InferGenericEndpoint as I, InferBody, InferOptions } from '$/endpoint/generic'
import { OK, BadRequest } from '$/response'
import { APIKit, GenericAPIKit } from '$/apikit'
import { ToJSON } from '$/types/json'

/*
	Unfortunately, generic endpoints has types that are not
	easily readable, unless T has been defined.
*/


// * Notice it extends ToJSON
interface Put extends ToJSON<{
	body: {
		name: string
		date?: Date
	},
	query: {
		seasonId: number
	}
}> {}

// * Notice it passes the event to endpoints first parameter
const PUT = <T extends Put>(e: KitEvent<T>) => endpoint(e)(
	parseJSON,
	(event) => {
		return OK({
			b: event.locals.json,
			q: {} as T['query']
		})
	},
	() => BadRequest({ error: 'End of pipe' })
)

// * Notice it uses `GenericAPIKit` instead of `APIKit
const x = {} as {
	PUT: <
		const B extends InferBody<typeof PUT>,
		const O extends InferOptions<typeof PUT> & RequestOptions
	>(body: B, options: O) => GenericAPIKit<typeof PUT<{ body: B } & O>>
}

const [response] = await x.PUT({ name: 'Bob', date: new Date().toJSON() }, { query: { seasonId: 123 }, cache: 'default' }).$.OK(res => {
	return res.json()
})

// Will show error if response returns invalid value:
const testType: {
	b: {
		name: 'Bob'
		date: string
	}
	q: {
		seasonId: 123
	}
} | undefined = response