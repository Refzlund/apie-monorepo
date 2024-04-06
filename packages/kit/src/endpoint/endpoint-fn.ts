import { IsUnknown } from '@apie/utility/types'
import { KitEvent, KitRequestInput } from './types/kitevent'
import { Pipe, Pipeline, PipelineResponse, PipelineResult, anyPipe } from '@apie/pipe'
import z from 'zod'
import { validateQuery } from './pipes/validate-query'
import { validateJSON } from './pipes/validate-json'
import { eJSON } from './pipes/e-json'
import { kitPipe } from '.'

export type Endpoint<I extends KitRequestInput, R> =
	Pipeline<(event: KitEvent<I>) => Promise<R>>

export type Validator = {
	/** Access the parsed body via `await e.json()` */
	body?: z.AnyZodObject | z.ZodArray<z.ZodTypeAny>
	/** Access the parsed query via `e.query` */
	query?: z.AnyZodObject
}

export const endpoint =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	<T extends Validator, K extends Pipeline<any>>(
		validator: T,
		cb: (
			pipe: Pipe<KitEvent<
				true extends IsUnknown<T['query']> & IsUnknown<T['body']> ? {}
				: true extends IsUnknown<T['query']>
				? { body: z.output<NonNullable<T['body']>> }
				: true extends IsUnknown<T['body']>
				? { query: z.output<NonNullable<T['query']>> }
				: {
					body: z.output<NonNullable<T['body']>>
					query: z.output<NonNullable<T['query']>>
				}
			>>,
			event: KitEvent<
				true extends IsUnknown<T['query']> & IsUnknown<T['body']> ? {}
				: true extends IsUnknown<T['query']>
				? { body: z.output<NonNullable<T['body']>> }
				: true extends IsUnknown<T['body']>
				? { query: z.output<NonNullable<T['query']>> }
				: {
					body: z.output<NonNullable<T['body']>>
					query: z.output<NonNullable<T['query']>>
				}
			>
		) => K
	) => {
		const pipeline = anyPipe(
			eJSON,
			validateJSON(validator),
			validateQuery(validator),

			e => cb(kitPipe as Pipe<KitEvent>, e)
		)

		return pipeline as Pipeline<
			(event: Parameters<typeof cb>[1]) => Promise<
				| (
					IsUnknown<T['body']> extends false
					? PipelineResponse<ReturnType<typeof validateJSON>>
					: never
				)
				| (
					IsUnknown<T['query']> extends false
					? PipelineResponse<ReturnType<typeof validateQuery>>
					: never
				)
				| PipelineResult<K>
			>
		>
	}