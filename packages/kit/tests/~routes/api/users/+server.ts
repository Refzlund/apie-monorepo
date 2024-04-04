import { endpoint } from '$'
import { z } from 'zod'
import { OK } from '@apie/responses'

const get = z.object({
	name: z.string(),
	age: z.number()
})

export const GET = endpoint({}, pipe => pipe(1))
export const POST = endpoint({ body: get }, pipe => pipe(
	async e => OK(await e.json())
))
