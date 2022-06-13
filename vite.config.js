import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: '~', replacement: `${__dirname}/src` }]
  }
})

// import { fileURLToPath, URL } from 'url'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/ export default defineConfig({ plugins: [vue({ options:{ compilerOptions: { isCustomElement: (tag) => ['md-linedivider'].includes(tag) } } })], resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } } })
