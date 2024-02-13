import { Router } from 'express'
import tagsController from './tag/controller'
import countriesController from './country/controller'

const api = Router().use(tagsController).use(countriesController)

export default Router().use('/api', api)
