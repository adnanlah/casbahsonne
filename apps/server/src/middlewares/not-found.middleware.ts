import {Request, Response, NextFunction} from 'express'

export const notFoundHandler = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  res.status(404).send({message: 'Resource not found!'})
}
