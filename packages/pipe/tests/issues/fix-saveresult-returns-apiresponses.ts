import { createEventPipe, saveResult } from '$'
import { BadRequest } from '@apie/responses'
import { expect, test } from 'bun:test'

const pipe = createEventPipe<{
	value: number
}>()

const fn = pipe((e, input: number) => {
	if (input > 100)
		return BadRequest('Input cannot be above 100')
	return input
})

test('fix: saveResult returns APIResponses', () => {
	const [$fn, get$fn] = saveResult(fn)

	pipe(
		123,
		$fn,
		() => { },
		(state) => {
			const fn = get$fn(state)
			expect(123).toBe(fn)
		}
	)
})