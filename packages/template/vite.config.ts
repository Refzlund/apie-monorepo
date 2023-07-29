/// <reference types="vitest" />

import { type UserConfig, mergeConfig } from 'vite'

// https://github.com/vitejs/vite/issues/5370
// ❌ import libConfig from 'vite-configs/vite.config.lib'
// Does not work - so until above issue is resolved, we import relatively:
import libConfig from '../configs/vite-configs/vite.config.lib'

const config = mergeConfig(
	libConfig('<repo>'),
	{
		// Custom configuration here
		

	} satisfies UserConfig
)

export default config