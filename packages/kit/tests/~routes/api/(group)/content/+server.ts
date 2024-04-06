import { endpoint } from '$'
import { OK } from '@apie/responses'

export const GET = endpoint({}, (pipe, e) => pipe(
	() => OK()
))