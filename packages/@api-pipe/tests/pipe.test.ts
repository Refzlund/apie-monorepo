import { expect, test } from 'bun:test'
import { createEventPipe } from '$'
import { OK } from '@api/responses'
import { getBody, isResponse } from '@api/responses'

const pipe = createEventPipe<{ yas: 'true' | 'false' }>()

const date = new Date()

const value123 = pipe(() => ({ v: 123 }))
const returnYasTrue = pipe((e, v: { c: Date }) => {
	if (e.yas === 'true') {
		return OK({ yas: e.yas, date })
	}
	return {
		v: 123,
		d: v
	}
})

const example = pipe(
	value123,
	{
		c: date
	},
	returnYasTrue
)

test('Pipe and correct early response', async () => {
	const result = await example({ yas: 'true' })

	expect(result).toBeInstanceOf(Response)
	if (isResponse(result)) {
		expect(result.status).toBe(200)
		const body = getBody(result)
		expect(body).toEqual({
			yas: 'true',
			date
		})
	}
})

test('Pipe and correct no response', async () => {
	const result = await example({ yas: 'false' })

	expect(result).not.toBeInstanceOf(Response)
	expect(result).toEqual({ v: 123, d: { c: date } })
})