import { endpoint } from '$'
import { OK } from '@apie/responses'
import { z } from 'zod'

const Post = z.object({
	name: z.string()
}).array()

export const POST = endpoint({ body: Post }, (pipe, e) => pipe(
	e.json(),
	(_, v) => OK(v)
))