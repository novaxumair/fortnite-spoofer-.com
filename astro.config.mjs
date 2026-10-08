import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { sitemapBrowserViewPlugin } from './scripts/sitemap-browser-view.mjs'

export default defineConfig({
  site: 'https://fortnitespoofer.com',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  /** Avoid Astro dev-toolbar “Learn more” links polluting Lighthouse on localhost */
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    plugins: [sitemapBrowserViewPlugin()],
    server: {
      port: 5174,
      strictPort: true,
    },
    preview: {
      port: 5175,
      strictPort: true,
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      cssCodeSplit: true,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons'
            }
            if (id.includes('/src/data/forums')) {
              return 'forums-data'
            }
            if (id.includes('/src/data/articles')) {
              return 'articles-data'
            }
            if (id.includes('/src/data/forum-replies')) {
              return 'forum-replies'
            }
            if (id.includes('/src/data/forum-index')) {
              return 'forum-index'
            }
          },
        },
      },
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
})
