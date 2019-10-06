import {} from './models'
import React from 'react'
import { render } from 'react-dom'
import { RootStore } from './models'
import { App } from './App'

const store = RootStore.create({
  users: {
    '1': {
      id: '1',
      name: 'mweststrate',
    },
    '2': {
      id: '2',
      name: 'mattiamanzati',
    },
    '3': {
      id: '3',
      name: 'johndoe',
    },
  },
  todos: {
    '1': {
      name: 'Eat a cake',
      done: true,
    },
  },
})

render(<App store={store} />, document.getElementById('root'))
