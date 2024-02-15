import { createEventPipe } from '$'
import { describe, expect, test } from 'bun:test'
import { pipe as pipeSymbol } from '$/pipe'

const pipe = createEventPipe<{}>()

describe('Nested Pipe', () => {
	test('Symbol', async () => {
		const nested = pipe(
			(e, v: number) => v,
			(e, v) => {
				return v
			}
		)

		expect(nested[pipeSymbol]).toBe(true)

		const result = await nested({}, 123)
		expect(result).toBe(123)
	})

	test('passing functions and nested pipes', async () => {
		const pipeline = pipe(
			(e) => () => { return 'some function' },
			(e, v) => {
				expect(v).toBeFunction()
				expect(v()).toBe('some function')
				return 123
			},
			(e, v) => pipe(
				v.toString() as '123'
			),
			(e, v) => {
				expect('123' as const).toBe(v)
				return v
			}
		)

		const result1 = await pipeline({})
		expect(result1).toBe('123')
	})

	test('returning neted pipe', async () => {
		const pipeline = pipe(
			(e, v) => 123,
			(e, v) => {
				return pipe(
					() => v.toString() as '123'
				)
			}
		)

		const result = await pipeline({})
		expect('123' as const).toBe(result)
	})
})



