import cors from 'cors'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import morgan from 'morgan'

import {notFoundHandler} from '../middlewares/not-found.middleware'
import sessionRouter from '../routes/auth.route'
import roomRouter from '../routes/room.route'

const app = express()

const sessionParser = session({
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'SECRET',
  resave: false,
  cookie: {
    sameSite: false,
    httpOnly: false,
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
})

app.use(
  cors({
    origin: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  }),
)

app.use(helmet())
app.use(express.json())
app.use(morgan('combined'))
app.use(sessionParser)
app.use('/', sessionRouter)
app.use('/', roomRouter)
app.use(notFoundHandler)

export {app, sessionParser}
