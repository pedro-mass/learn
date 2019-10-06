import React from 'react'
import { observer } from 'mobx-react'
import { UserPicker } from './UserPicker'

export const Todo = observer(props => (
  <div>
    <input
      type="checkbox"
      checked={props.todo.done}
      onChange={e => props.todo.toggle()}
    />
    <input
      type="text"
      value={props.todo.name}
      onChange={e => props.todo.setName(e.target.value)}
    />
    <UserPicker
      user={props.todo.user}
      store={props.store}
      onChange={userId => props.todo.setUser(userId)}
    />
  </div>
))
Todo.displayName = 'TodoView'
