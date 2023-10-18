/* eslint-disable @typescript-eslint/no-unused-vars */

import { endpoint } from '$/endpoint'
import { EndpointRequestInput as RQ } from '$/endpoint/callback'
import { KitEvent } from '$/endpoint/event'
import { parseJSON } from '$/endpoint/functions'
import { InferGenericEndpoint as I } from '$/endpoint/generic'
import { OK } from '$/response'
import { APIKit } from '$/apikit'

/*
	Unfortunately, generic endpoints has types that are not
	easily readable, unless T has been defined.
*/

interface PUT {
	body: {
		name: string
		date?: Date
	},
	query: {
		seasonId: number
	}
}

const PUT = <T extends PUT>(e: KitEvent<T>) => endpoint(e)(
	parseJSON,
	(event) => {
		return OK({
			b: event.locals.json,
			q: {} as T['query']
		})
	}
)


const x = {} as {
	PUT: <const IN extends I<typeof PUT>>
		(...args: RQ<IN>) => APIKit<ReturnType<typeof PUT<IN>>>
}

const response = x.PUT({ name: 'Bob', date: new Date().toJSON() }, { query: { seasonId: 123 } })
