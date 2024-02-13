import { createEventPipe } from '$'
import { describe, expect, test } from 'bun:test'
import { pipe as pipeSymbol } from '$/pipe'

const pipe = createEventPipe<{}>()

describe('Nested Pipe', () => {
	test('Symbol', async () => {
		const nested = pipe.nested(
			(e, v: number) => v,
			(e, v) => {
				return v
			}
		)

		expect(nested[pipeSymbol]).toBe(true)

		const result = await nested({}, 123)
		expect(result).toBe(123)
	})

	test('Functionality', async () => {
		const pipeline = pipe(
			(e) => 123,
			(e, v) => {
				return pipe.nested(
					v.toString()
				)
			},
			(e, v) => {
				expect(v).toBe('123')
				return v
			}
		)

		const pipeline2 = pipe(
			(e, v) => 123,
			(e, v) => {
				return pipe.nested(
					() => v.toString() as '123'
				)
			}
		)

		const result1 = await pipeline({})
		expect(result1).toBe('123')

		const result2 = await pipeline2({})
		expect('123' as const).toBe(result2)
	})
})



