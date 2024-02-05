import { createEventPipe, saveResult } from '$'
import { expect, test } from 'bun:test'

const pipe = createEventPipe<{ value: number }>()
const fn = pipe(() => 123 as const)

test('pipe: saveResult', async () => {

	const [$fn, get$fn] = saveResult(fn)

	const pipeline = pipe(
		$fn,
		(e, v) => {
			expect(v).toBe(v)
			// Do something inbetween
		},
		() => { },
		// ... Somewhere later in the chain
		(event) => {
			const number = get$fn(event)
			expect(number).toBe(123)
			return number
		}
	)

	const result = await pipeline({ value: 123 })
	expect(result).toBe(123)

})