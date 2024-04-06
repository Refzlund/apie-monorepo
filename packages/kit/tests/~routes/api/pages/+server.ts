import { endpoint } from '$'
import { createEventPipe } from '@apie/pipe'
import { BadRequest, OK } from '@apie/responses'

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
export const POST = endpoint({}, pipe => pipe(1))
