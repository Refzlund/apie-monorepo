import { createEventPipe } from '$'
import { expect, test } from 'bun:test'

const pipe = createEventPipe<{
	value: number
}>()

test.only('fix-only-return-apie-responses', async () => {

	const pipeline = pipe(
		(e) => {
			return new Response('OK', { status: 200 })
		},
		(e, v) => {
			expect(v).toBeInstanceOf(Response)
			return true
		}
	)

	expect(await pipeline({ value: 0 })).toBe(true)

})