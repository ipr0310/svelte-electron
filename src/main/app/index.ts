import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import { error } from './middleware/error'
import { createServer } from 'node:http'
import { Notification } from 'electron'
import { join } from 'path'
import { WebSocketServer } from 'ws'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.use(error)
app.use(express.static(join(__dirname, '../renderer')))

const server = createServer(app)

const wss = new WebSocketServer({ server })

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data: string) {
    console.log('received: %s', data)

    new Notification({
      title: 'New Notification',
      body: `Pong - ${JSON.stringify(data)}`
    }).show()
  })

  ws.send('something')
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const runServer = () => {
  server.listen(4915, () => {
    console.debug(`server running at http://localhost:4915`)
  })
}
