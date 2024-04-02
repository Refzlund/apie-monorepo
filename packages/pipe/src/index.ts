import { createEventPipe } from './pipe'

export { createEventPipe } from './pipe'
export { saveResult } from './save-result'
export type { Pipeline } from './types/pipe'
export type * from './types/utility'

export const pipe = createEventPipe()