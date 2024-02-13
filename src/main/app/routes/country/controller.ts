import { NextFunction, Request, Response, Router } from 'express'
import { getCountries, insertCountry } from './service'
import { HttpException } from '../../types'
import type { Country } from './model'

const router = Router()

/**
 * Get countries
 * @route {GET} /api/countries
 * @returns countries
 */
router.get('/countries', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const countries = await getCountries()

    res.json({ countries })
  } catch (error) {
    next(error)
  }
})

/**
 * Insert country
 * @route {POST} /api/countries
 * @bodyparam  id
 * @bodyparam  name
 * @returns created country
 */
router.post('/countries', async (req: Request<Country>, res: Response, next: NextFunction) => {
  try {
    if (!req.body?.id || !req.body?.name) throw new HttpException(422, 'Parameter missing')

    const { id, name } = req.body

    const result = await insertCountry({ id, name })

    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

export default router
