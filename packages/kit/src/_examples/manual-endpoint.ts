/* eslint-disable @typescript-eslint/no-unused-vars */

import { APIEKit } from '$/apikit'
import { Endpoint } from '$/endpoint'
import { BadRequest, OK } from '$/response/types'

type ChatCompletionsInput = {
	body: {
		model: 'gpt-4' | 'gpt-4-0613' | 'gpt-4-32k' | 'gpt-4-32k-0613' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0613' | 'gpt-3.5-turbo-16k' | 'gpt-3.5-turbo-16k-0613'
		messages: {
			role: 'system' | 'user' | 'assistant' | 'function'
			content: string | null
			name?: string
			function_call?: {
				name: string
				arguments: string
			}
		}[]
		functions?: Array<{
			name: string
			description?: string
			parameters: Record<string, unknown>
		}>
		/** @default 1 */
		temperature?: number
		/** @default 1 */
		top_p?: number
		/** @default 1 */
		n?: number
		/** @default false */
		stream?: boolean
		/** @default null */
		stop?: string | string[]
		/** @default Infinity */
		max_tokens?: number
		/** @default 0 */
		presence_penalty?: number
		/** @default 0 */
		frequency_penalty?: number
		/** @default null */
		logit_bias?: Record<string, number>
		user?: string
	}
}

type ChatCompletions = Endpoint<ChatCompletionsInput, OK<{}>>

type OpenAI = {
	v1: {
		chat: {
			completions: {
				POST: APIEKit<ChatCompletions>
			}
		}
	}
}

const api = {} as OpenAI

api.v1.chat.completions.POST({
	model: 'gpt-3.5-turbo',
	messages: [
		{
			role: 'user',
			content: 'Hello world!'
		}
	]
}).OK(async res => {
	for await (const chunk of res.body) {
		console.log(chunk)
	}
})
