// Testing some syntaxes.

import { ExtractKitResponse, InferKitResposneFn, KitResponse, UnknownKitResponse } from './response/kitresponse'


// type Endpoint<
// 	Input extends KitRequestInput = {},
// 	Responses extends KitResponse<number, boolean> = UnknownKitResponse,
// > = (...args: EndpointRequestInput<Input['body'], Input['query']>) =>
// 		EndpointPromise<Responses>

type EndpointPromise<
	Responses extends KitResponse<number, boolean, unknown, string> = UnknownKitResponse
> = {
		[Key in InferKitResposneFn<Responses>]: (
			callback: (
				response: ExtractKitResponse<Responses, Key>
			) => void
		) => EndpointPromise<Responses>
} & {
	/** returns a store */
	$(): void
} & {
	/** Returns the value of the given callback */	
	$: {
		[Key in InferKitResposneFn<Responses>]: () => void
	}
}

// const res = POST({ name: 'yas', date: '' })
