import { expect, test } from 'bun:test'
import { createEventPipe } from './create-pipe'
import { OK } from '@api/responses'
import { getBody, isResponse } from '../../@api-responses/src/api-response'

const pipe = createEventPipe<{ yas: 'true' | 'false' }>()

const date = new Date()
const example = pipe(
	e => {
		return {
			v: 123
		}
	},
	(e, v) => {
		if(e.yas === 'true') {
			return OK({ yas: e.yas, date })
		}
		return {
			v: 123
		}
	},
	(e) => {
		return {
			c: date
		}
	}
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
	expect(result).not.toHaveProperty('v')
	expect(result).toEqual({ c: date })
})