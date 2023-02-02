import {z} from 'zod'

export const createRoomPayloadSchema = z.object({
  body: z.object({
    name: z.string(),
    password: z.string(),
    numOfPlayers: z.number().int().min(2).max(4),
    watchable: z.boolean(),
  }),
})

export const joinRoomPayloadSchema = z.object({
  body: z.object({
    roomId: z.string(),
    password: z.string(),
  }),
})
