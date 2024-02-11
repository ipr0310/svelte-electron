import { NextFunction, Response, Router } from 'express'
import { getTags } from './service'

const router = Router()

/**
 * Get popular tags
 * @route {GET} /api/tags
 * @returns tags true
 */
router.get('/tags', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = getTags()

    res.json(tags)
  } catch (error) {
    next(error)
  }
})

export default router
