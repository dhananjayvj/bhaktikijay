import path from 'node:path'
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const colleagues = mode === 'colleagues'
  const inviteUrl = new URL(
    colleagues ? 'https://bhakti-dhananjay.life/' : 'https://celebrate.bhakti-dhananjay.life/',
  )
  const description = colleagues
    ? 'Join us for the wedding and reception of Bhakti & Dhananjay on Sunday, March 14, 2027. Muhurtham at 8:48 AM in Bengaluru.'
    : 'Join us in celebrating the union of Bhakti & Dhananjay. Festivities on March 11, 13 and 14, 2027; muhurtham Sunday, March 14, 8:48 AM, Bengaluru.'

  return {
    plugins: [
      react(),
      {
        name: 'invite-audience-metadata',
        transformIndexHtml(html) {
          return html
            .replace('</head>', `${colleagues ? '' : '    <meta name="robots" content="noindex, nofollow" />\n  '}</head>`)
            .replaceAll('__INVITE_DESCRIPTION__', description)
            .replaceAll('__INVITE_DATES__', colleagues ? 'Sunday, March 14, 2027' : 'March 11, 13 and 14, 2027')
            .replaceAll('__INVITE_URL__', inviteUrl.href)
            .replaceAll('__INVITE_OG_IMAGE__', new URL(colleagues ? 'og-wedding-2027.jpg' : 'og-couple-2027.jpg', inviteUrl).href)
        },
      },
      {
        name: 'prune-other-audience-preview',
        apply: 'build',
        closeBundle() {
          rmSync(path.join(rootDir, 'dist', colleagues ? 'og-couple-2027.jpg' : 'og-wedding-2027.jpg'), {
            force: true,
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'src'),
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/framer-motion')) return 'framer-motion'
            return undefined
          },
        },
      },
    },
  }
})

