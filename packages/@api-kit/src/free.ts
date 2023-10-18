/* eslint-disable @typescript-eslint/no-unused-vars */
// Testing some syntaxes.

import { endpoint } from './endpoint'
import { BadRequest, OK } from './response'
import { APIKit } from './apikit'

interface Post {
	body: {
		name: string
	}
}

const POST = endpoint<Post>()(
	() => OK({ test: 123 }),
	() => BadRequest({ error: 'message' })
)

const api = {} as {
	test: {
		POST: APIKit<typeof POST>
	}
}

const v = api.test.POST({ name: 'Helloo' }).BadRequest(res => {
	
})

const h = await v.$.OK(async res => {
	// return res.json()
}).BadRequest(res => {
	return 'Bad Request :(' as const
}).any(res => {
	
})

if (h[0]) {
	console.log(h[0])
}

const t = await v

// const res = POST({ name: 'yas', date: '' })
