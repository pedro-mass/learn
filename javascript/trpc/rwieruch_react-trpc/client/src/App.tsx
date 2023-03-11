import * as React from 'react'
import { trpc } from './trpc'

const App = () => {
  const { data, isLoading, refetch } = trpc.user.getUsers.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <GetUser />
      <UserList data={data}/>
      <NewUser onSuccess={refetch}/>
    </div>
  )
}

function GetUser({ id = '0' }) {
  const { data, isLoading } = trpc.user.getUserById.useQuery(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PrettyPrint {...data} />
    </div>
  )
}

function PrettyPrint(props: object) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

function UserList({ data }) {
  return (
    <div>
      <ul>
        {(data ?? []).map(user => (
          <li key={user.id}>
            <PrettyPrint {...user} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function NewUser({ onSuccess }) {
  const [name, setName] = React.useState('')
  const { data, isLoading, refetch } = trpc.user.getUsers.useQuery();

  const mutation = trpc.user.createUser.useMutation({
    onSuccess
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setName('')
    mutation.mutate({ name })
  }

  return <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name:</label>
    <input id="name" type="text" value={name} onChange={handleChange} />

    <button type="submit">Create</button>
  </form>
}

export default App
