import HttpException from '../utils/http-exception.class'
import {Request, Response, NextFunction} from 'express'

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const status = error.statusCode || error.status || 500

  response.status(status).send(error)
}
