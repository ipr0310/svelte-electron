import { Router } from 'express'
import tagsController from './tag/controller'

const api = Router().use(tagsController)

export default Router().use('/api', api)
