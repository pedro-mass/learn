import { z } from 'zod'
import _ from 'lodash'
import { router, publicProcedure } from '../trpc'

import { users } from './db'
import { User } from './types'

export const userRouter = router({
  getUsers: publicProcedure.query(() => {
    return users
  }),
  getUserById: publicProcedure
    // looks like input validation
    .input((val: unknown) => {
      if (typeof val === 'string') return val
      throw new Error(`Invalid input: ${typeof val}`)
    })
    // then we can focus on the query
    .query(req => {
      const { input } = req

      const user = users.find(user => user.id === input)

      return user
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(req => {
      const { input } = req

      const user: User = {
        id: `${Math.random()}`,
        name: input.name,
      }

      users.push(user)

      return user
    }),
  deleteUserById: publicProcedure.input(validateId).mutation(req => {
    const idToDelete = req.input

    const withId = ({ id }: { id: string }) => id === idToDelete

    if (_.filter(users, withId).length > 1) {
      throw new Error(`More than one user found with ID: ${idToDelete}`)
    }

    const deletedUsers = _.remove(users, withId)
    return _.first(deletedUsers)
  }),
  // updateUserById
})

function validateId(val: unknown) {
  if (typeof val === 'string') return val

  throw new Error(`Invalid input: ${typeof val}`)
}
