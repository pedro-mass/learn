import cors from 'cors'
import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'

import { appRouter } from './router'
import { createContext } from './context'

const app = express()

app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

const port = process.env.PORT || 4000
app.listen(port)
console.log(`listening on http://localhost:${port}`)

export type AppRouter = typeof appRouter
