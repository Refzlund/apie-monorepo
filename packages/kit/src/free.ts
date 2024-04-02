/* eslint-disable @typescript-eslint/no-unused-vars */
// Testing some syntaxes.

import { Endpoint, endpoint, kitPipe } from './endpoint'
import { BadRequest, InternalServerError, OK } from '@apie/responses'
import { APIEKit } from './apikit'
import { pipe } from '@apie/pipe'
import z from 'zod'

const person = z.object({
	name: z.string(),
	age: z.number()
})

const post = z.object({
	name: z.string(),
	user: person
})

const postQuery = z.object({
	order: z.string().array().optional()
})

const test = kitPipe(
	(e, v) => {
		e.json()
		e.query
	}
)

const POST = endpoint({ body: post, query: postQuery }, pipe => pipe(
	(e) => {
		if(!e.query.order)
			return BadRequest({ error: 'User error test' })
		if (e.query.order.length > 5)
			return InternalServerError('Test')
	},
	async (e) => OK({ ...await e.json() }),
	(e) => e.json()
))

type T = typeof POST extends Endpoint<infer A, infer B> ? {A:A,B:B} : never

const api = {} as {
	test: {
		POST: APIEKit<typeof POST>
	}
}

const v = api.test.POST({ name: 'Helloo', user: { name: 'asd' } }).BadRequest(res => {
	
}).InternalServerError(res => {

})

const h = await v.$.OK(async res => {
	return res.json()
}).BadRequest(res => {
	return 'Bad Request :(' as const
}).any(res => {

})

if (h[0]) {
	console.log(h[0])
}

const t = await v

// const res = POST({ name: 'yas', date: '' })
