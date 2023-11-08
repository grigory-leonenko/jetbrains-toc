import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const port = 8000
const data = readFileSync(resolve(__dirname, 'data.json'))

app.use(
  cors({
    origin: '*',
  }),
)

app.get('/topics', (req, res) => {
  // Emulate server latency
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    res.end(data)
  }, 1000)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
