import express from 'express'
import { HttpException } from '../types'

/* eslint-disable */
export const error = (
  err: Error | HttpException,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'missing authorization credentials'
    })
    // @ts-ignore
  } else if (err && err.errorCode) {
    // @ts-ignore
    return res.status(err.errorCode).json(err.message)
  } else if (err) {
    return res.status(500).json(err.message)
  }
}
