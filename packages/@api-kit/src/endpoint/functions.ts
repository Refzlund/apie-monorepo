import { InferKitEvent, KitEvent, Locals, asKitEvent } from './event'

import { BadRequest } from '$/response'
import { ToJSON } from '$/types/json'
import { UnknownRecord } from '$/types/utility'


// export async function parseJSON<E extends KitEvent>(event: E)
// ^ does not work :(
export async function parseJSON<E extends KitEvent>(event: E) {
	type I = InferKitEvent<E>
	
	try {
		return {
			json: await event.request.json() as I['body'],
		}
	} catch (error) {
		return BadRequest({
			error: 'badJSON',
			message: 'The provided JSON is invalid'
		})
	}
}