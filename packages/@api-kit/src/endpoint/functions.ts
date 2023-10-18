import { InferKitEvent, KitEvent } from './event'

export async function parseJSON<E extends KitEvent>(event: E) {
	type Input = InferKitEvent<E>
	return {
		json: await event.request.json() as Input['body'],
	}
}