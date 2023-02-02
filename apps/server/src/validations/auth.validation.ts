import {z} from 'zod'

export const loginPayloadSchema = z.object({
  body: z.object({
    username: z.string(),
  }),
})

export const checkIngamePayloadSchema = z.object({
  body: z.object({
    roomId: z.string().length(7),
  }),
})
