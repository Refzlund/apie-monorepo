<script lang='ts'>

	import api from 'api'

	const result = api.GET({ query: { number: [123] } })
		.OK(async res => {
			console.log(res.body)
		})
		.BadRequest(async res => {
			console.log(res.body)
		})
		.$.OK(async res => res.body)
	
	result.then(console.log)
	
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
