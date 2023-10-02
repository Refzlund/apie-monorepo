/* eslint-disable @typescript-eslint/no-unused-vars */

import { endpoint } from '$/endpoint'
import { EndpointRequestInput as RQ } from '$/endpoint/callback'
import { KitEvent } from '$/endpoint/event'
import { parseJSON } from '$/endpoint/functions'
import { InferBody as IB, InferQuery as IQ } from '$/endpoint/generic'
import { OK } from '$/response'

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
	PUT: <
		const B extends IB<typeof PUT>,
		const Q extends IQ<typeof PUT>
	>(...args: RQ<B, Q>) => ReturnType<typeof PUT<{ body: B, query: Q }>>
}

const response = x.PUT({ name: 'Bob', date: new Date() }, { query: { seasonId: 123 } })
