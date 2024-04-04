import { endpoint } from '@apie/kit'
import { OK } from '@apie/responses'
import { z } from 'zod'

const query = z.object({

	number: z.number().array()

})

export const GET = endpoint({ query }, pipe => pipe(
	(e) => OK({ yourQuery: e.query })
))