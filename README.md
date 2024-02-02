# @api

`@api` is a monorepo that contains several packages for handling a REST API in a functional programmatic manner.

However, it is also intended to generally provide typed error responses.

- [`@api/pipe`](./packages/@api-pipe) is the driver of the functional programming structure
- [`@api/responses`](./packages/@api-responses) contains branded responses and is used in conjunction with the other packages
- [`@api/utilities`](./packages/@api-utility) contains utility types/functions that the other packages depend on

> [!IMPORTANT]  
> The following packages are work in progress. Find them in the `feat-api-kit` branch

- [`@api/kit`](./packages/@api-kit) is a library for [SvelteKit](https://kit.svelte.dev) that provides type-safety between frontend and backend.<br><sup>(Formerly known as [`sveltekit-zero-api`](https://github.com/Refzlund/sveltekit-zero-api))<sup/>

## Example

```ts

type State = {
	value: number
}

const pipe = createEventPipe<State>()

const checkValue = pipe((event, input: number) => {
	if(input > event.value)
		return BadRequest(`Input cannot be more than ${event.value}`)
	return 'Some string'
})

const logString = pipe((event, input: string) => {
	console.log(input)
	return OK()
})

const combined = pipe(
	200,
	checkValue,
	logString
)

combined({ value: 100 }) // => BadRequest(`Input cannot be more than 100`)
combined({ value: 500 }) // => console.log('Some string'), OK()

```