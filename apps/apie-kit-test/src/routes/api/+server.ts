import { endpoint } from '@apie/kit'
import { createEventPipe } from '@apie/pipe'
import { OK } from '@apie/responses'
import { z } from 'zod'

const query = z.object({

	number: z.number().array()

})

const customPipe = createEventPipe<{ locals: { Bob: string } }>()

export const GET = endpoint({ query }, (pipe, e) => pipe(
	() => OK({ yourQuery: e.query, bob: e.locals.Bob })
))

const body = z.object({
	name: z.string()
})

export const PUT = endpoint({ body }, (pipe, e) => pipe(
	e.json(),
	(e,v) => customPipe(
		() => OK()
	)
))