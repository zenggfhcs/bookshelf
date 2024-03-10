// uno.config.ts
import {defineConfig} from 'unocss'

export default defineConfig({
   rules: [
      [/^m-v-(.+)$/, ([_, num]) => ({ margin: `${num} 0` })],
   ]
})