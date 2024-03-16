// uno.config.ts
import {defineConfig} from 'unocss'

export default defineConfig({
	rules: [
		[/^v-c-(.+)$/, ([_, v]) => ({color: `var(--${v})`})],
	]
})