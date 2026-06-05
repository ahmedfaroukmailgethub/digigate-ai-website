import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { randomUUID } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))
const contactFile = resolve(rootDir, 'data/contact-submissions.json')

type ContactSubmission = {
  id: string
  name: string
  email: string
  company: string
  message: string
  submittedAt: string
}

const readRequestBody = (request: import('node:http').IncomingMessage) =>
  new Promise<string>((resolveBody, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => resolveBody(body))
    request.on('error', reject)
  })

const toCleanString = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const saveContactSubmission = (submission: ContactSubmission) => {
  mkdirSync(dirname(contactFile), { recursive: true })

  if (!existsSync(contactFile)) {
    writeFileSync(contactFile, '[]\n')
  }

  const current = JSON.parse(readFileSync(contactFile, 'utf8')) as ContactSubmission[]
  current.push(submission)
  writeFileSync(contactFile, `${JSON.stringify(current, null, 2)}\n`)
}

export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
  },
  plugins: [
    react(),
    {
      name: 'contact-form-json-api',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (request, response) => {
          if (request.method !== 'POST') {
            response.statusCode = 405
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ error: 'Method not allowed' }))
            return
          }

          try {
            const body = JSON.parse(await readRequestBody(request)) as Record<string, unknown>
            const submission = {
              id: randomUUID(),
              name: toCleanString(body.name),
              email: toCleanString(body.email),
              company: toCleanString(body.company),
              message: toCleanString(body.message),
              submittedAt: new Date().toISOString(),
            }

            if (!submission.name || !submission.email || !submission.company || !submission.message) {
              response.statusCode = 400
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ error: 'All fields are required' }))
              return
            }

            saveContactSubmission(submission)
            response.statusCode = 201
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ ok: true, submission }))
          } catch {
            response.statusCode = 500
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ error: 'Unable to save contact request' }))
          }
        })
      },
    },
  ],
})
