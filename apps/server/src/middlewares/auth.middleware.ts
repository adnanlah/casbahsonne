import {NextFunction, Request, Response} from 'express'
import {ISession} from '../types'

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!(req.session as ISession).userId) res.sendStatus(401)
  else next()
}
