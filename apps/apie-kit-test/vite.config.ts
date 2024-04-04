import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { watchAPI } from '@apie/kit'

export default defineConfig({
	plugins: [sveltekit(), watchAPI()]
})
