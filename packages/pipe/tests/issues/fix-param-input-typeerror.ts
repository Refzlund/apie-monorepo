import { createEventPipe } from '$'
import { test } from 'bun:test'

const pipe = createEventPipe<{
	value: number
}>()

test.skip('fix-param-input-typeerror', () => {
	const fn = pipe((e, v: number) => {
		return 'str'
	})

	pipe(
		(e) => 123,
		fn // Type-error on this line
	)
})