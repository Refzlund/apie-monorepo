import { endpoint } from '$'
import { createEventPipe } from '@apie/pipe'
import { BadRequest, OK } from '@apie/responses'
import z from 'zod'

const pipeA = createEventPipe<{}>()
const pipeB = createEventPipe<{ locals: {} }>()

export const GET = endpoint({}, pipe => pipe(
	pipeA(
		() => OK()
	),
	pipeB(
		() => BadRequest()
	)
))

const post = z.object({
	name: z.string()
}).or(z.object({
	name: z.string()
}).array())
	.transform(v => v)

export const POST = endpoint({ body: post }, (pipe, e) => pipe(
	e.json(),
	(_, v) => OK(v)
))
