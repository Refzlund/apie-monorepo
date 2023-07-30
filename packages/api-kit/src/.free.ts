// Testing some syntaxes.

import type { Simplify, UnknownRecord } from '../types/utility'
import type { RequestEvent } from '@sveltejs/kit'


type Endpoint<
	RequestContent extends KitRequestContent = {},
	Responses extends KitResponse[] = [],
> = {}

interface KitRequestContent {
	query?: UnknownRecord
	body?: UnknownRecord
}

type KitRequest = {}

interface KitResponse<Status extends number, Ok extends boolean> {
	status: Status
	ok: Ok
}

type BadRequest<Body extends UnknownRecord> = KitResponse<400, false>
type Created<Body extends UnknownRecord> = KitResponse<201, true>



type EndpointFunction = () => void

function endpoint<T extends KitRequestContent = {}>(...args: unknown[]) {
	return {} as Endpoint<Simplify<T>, [
		BadRequest<{ error: 'Invalid seasonId' }>,
		Created<{ message: 'Your match has been created!' }>
	]>
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


export const POST = endpoint<Post>(

)

