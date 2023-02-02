import * as dotenv from 'dotenv'

dotenv.config()

export default {PORT: process.env.port || 8080}
