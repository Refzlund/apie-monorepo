import { createEventPipe, Pipe } from '@apie/pipe'
import { KitEvent } from './types/kitevent'
import { UnknownRecord } from '@apie/utility/types'

export const kitPipe: Pipe<KitEvent<{
	body?: unknown
	query?: UnknownRecord
}>> = createEventPipe()