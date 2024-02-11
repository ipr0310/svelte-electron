import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import { error } from './middleware/error'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.use(error)

app.get('/', (_req: express.Request, res: express.Response) => {
  res.json({ status: 'API is running on /api' })
})

/**
 * Server creation
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createServer = (port = 5000) => {
  app.listen(port)
}
