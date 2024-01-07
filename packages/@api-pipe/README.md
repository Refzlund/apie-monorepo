<h1 align='center'>@api/pipe</h1>

> [!WARNING]  
> Work in progress

`@api/pipe` creates a function that creates pipelines with requirements (aka dependency injection).

The pipe can return a response via `@api/responses`, and the pipe will end early.

The goal of the `@api` is to handle REST api-like infrastructures with typesafety. This in my belief, does not limit you to use it outside of REST api-like infrastructures.
This means responses will be typed. You can see what responses a certain pipeline might throw at you.

#### **Example**

```ts
type SomeInput = { hello: 'world' | 'there' }

const helloPipe = createEventPipe<SomeInput>()

const myPipeline = helloPipe(
	(e, v: undefined) => {
		return {
			pipeValue: e.hello
		}
	},
	(e, v) => {
		if(v.pipeValue === 'there')
			return OK({ message: 'General Kenobi' })
		
		return v.pipeValue + e.hello
	}
)

// Returns<string> which is `worldworld`
const result1 = myPipeline({ hello: 'world' }) 

// Returns<APIResponse>
const result2 = myPipeline({ hello: 'there' })
if(isResponse(result2)) {
	const body = getBody(result2) // { message: 'General Kenobi' }
	result2.body // string
}

```