import terser from '@rollup/plugin-terser';
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    minify: false,
    sourcemap: true,
    outDir: 'lib/bundle',
    lib: {
      name: '$$',
      fileName: 'svelte',
      entry: 'src/svelte.js',
    },
    rollupOptions: {
      output: [
        {
          entryFileNames: 'svelte.js',
          format: 'umd',
          name: '$$',
        },
        {
          entryFileNames: 'svelte.min.js',
          format: 'umd',
          name: '$$',
          plugins: [terser()],
        },
      ],
    },
  },
})
