import * as React from 'react'
import { trpc } from './trpc'

const App = () => {
  const fetchUser = async () => {
    const user = await trpc.user.getUserById.query('0')

    console.log({ user })
  }

  React.useEffect(() => {
    fetchUser()
  }, [])

  return <></>
}

export default App
