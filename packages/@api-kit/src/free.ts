/* eslint-disable @typescript-eslint/no-unused-vars */
// Testing some syntaxes.

import { endpoint } from './endpoint'
import { BadRequest, OK } from './response'
import { APIKit } from './apikit'

class User {
	name: string = ''
}

interface Post {
	body: {
		name: string
		user: User
	}
}

const POST = endpoint<Post>()(
	() => OK({ test: 123 }),
	() => BadRequest({ error: 'message', noUser: new User() })
)

const api = {} as {
	test: {
		POST: APIKit<typeof POST>
	}
}

const v = api.test.POST({ name: 'Helloo', user: { name: 'asd' } }).BadRequest(res => {
	
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
