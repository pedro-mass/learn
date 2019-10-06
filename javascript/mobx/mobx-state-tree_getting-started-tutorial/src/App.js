import React from 'react'
import { observer } from 'mobx-react'
import { values } from 'mobx'
import { Todo } from './components/Todo'
import { TodoCounter } from './components/TodoCounter'

export const randomId = () => Math.floor(Math.random() * 1000).toString(36)

export const App = observer(props => (
  <div>
    <button onClick={() => props.store.addTodo(randomId(), 'New Task')}>
      Add Task
    </button>
    {values(props.store.todos).map(todo => (
      <Todo store={props.store} todo={todo} />
    ))}
    <TodoCounter store={props.store} />
  </div>
))
App.displayName = 'AppView'
