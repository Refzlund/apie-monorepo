import { expect, test } from 'bun:test'
import { Pipeline, createEventPipe, exit } from '$'
import { BadRequest, OK } from '@apie/responses'
import { getBody, isResponse } from '@apie/responses'
import * as R from '@apie/responses/types'

const pipe = createEventPipe<{ yas: 'true' | 'false' }>()

test('fn as input', () => {
	const fn = pipe((e, v: boolean) => {
		if (!v)
			return BadRequest('Oh noeee')
		return 123
	})

	const pipeline = pipe(
		fn,
		(e, v) => {
			expect(123).toBe(v)
		}
	)
	pipeline({ yas: 'false' }, true)

	type T = typeof pipeline._ extends boolean ? true : false
	type IsTrue<T extends true> = T
	type _InputTest = IsTrue<T>
})

test('Pipe types are correct', () => {
	const pipeline = pipe(
		(e, i?: boolean) => {
			if (i)
				return OK('message')
			return { some: 123 }
		},
		(e, v) => {
			// TODO: v.some should be a literal
			// expect({ some: 123 } as const).toEqual(v)
			expect({ some: 123 }).toEqual(v)
			return { more: 'abc' }
		},
		(e, v) => {
			// TODO: v.more should be a literal
			// expect({ more: 'abc' } as const).toEqual(v)
			expect({ more: 'abc' }).toEqual(v)
			return v
		}
	)

	type PipelineType = Pipeline<(event: {
		yas: 'true' | 'false'
	}, input?: boolean | void) => Promise<
		| { more: string } // TODO const: { more: 'abc' }
		| R.OK<'message'>
	>>

	expect(pipeline).toEqual(pipeline as PipelineType)
	const _result1 = pipeline({ yas: 'true' }, true)
})


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

test('Pipe exits early with exit()', async () => {
	const pipeline = pipe(
		() => {
			return 1234 as const
		},
		(_, v) => {
			return exit(v)
		},
		() => {
			throw new Error()
			return OK()
		},
		(e, v) => {
			return 'Mhm.' as const
		},
	)

	let result = await pipeline({ yas: 'true' })
	expect(result).toBe(1234)

	result = 1234
	result = OK()
	result = 'Mhm.'

	// @ts-expect-error 0 is not assignable
	result = 0
})