/* eslint-disable @typescript-eslint/no-unused-vars */
// Testing some syntaxes.

import { Endpoint, endpoint, kitPipe } from './endpoint/endpoint-fn'
import { BadRequest, InternalServerError, OK, TemporaryRedirect } from '@apie/responses'
import { APIEKit } from './api/types/apiekit'
import z from 'zod'

const person = z.object({
	name: z.string(),
	age: z.number()
})

const post = z.object({
	message: z.string(),
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
	// TODO    Nested pipes (e.g. `(e) => pipe(OK({...}))`) does not include APIResponse
	// TODO    in ReturnType<POST>
	async (e) => OK({ ...await e.json() }),
	(e) => e.json()
))

const api = {} as {
	test: {
		POST: APIEKit<typeof POST>
		slug$: (slug: string) => {
			POST: APIEKit<typeof POST>
		}
	}
}

const v = api.test.POST({ message: 'Helloo', user: { name: 'asd', age: 21 } })
	.BadRequest(res => {
		
	}).InternalServerError(res => {

	})

const h = await v.$.OK(async res => {
	return res.json()
}).BadRequest(res => {
	return 'Bad Request :(' as const
}).any(res => {
	// TODO   Hijack .json() etc. to return res.body, and perform
	// TODO   `.json()` immediately so the user can access `body` immediately.
	// TODO   And type `body` if application/json

	res.body
})

if (h[0]) {
	console.log(h[0])
}

const t = await v

// const res = POST({ name: 'yas', date: '' })
