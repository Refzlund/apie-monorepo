import { endpoint } from '$'
import { OK } from '@apie/responses'
import { z } from 'zod'

const query = z.object({

	order: z.string().array()

})

export const GET = endpoint({ query }, pipe => pipe(
	(e) => OK({ yourQuery: e.query })
))