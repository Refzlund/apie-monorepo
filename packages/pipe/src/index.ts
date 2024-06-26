import { createEventPipe } from './pipe'

export { createEventPipe } from './pipe'
export { exit } from './exit'
export { saveResult } from './save-result'
export type {
	Pipeline,
	Pipe,
	PipeType,
	PipelineResponse,
	PipelineResult
} from './types/pipe'
export type * from './types/utility'

export const pipe = createEventPipe()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const anyPipe = createEventPipe<any>()