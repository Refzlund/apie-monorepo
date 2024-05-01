import { endpoint } from '$'
import { OK } from '@apie/responses'

export const POST = endpoint({ body: Buffer }, (pipe, e) => pipe(
	e.request.arrayBuffer(),
	(_, v) => OK(v)
))