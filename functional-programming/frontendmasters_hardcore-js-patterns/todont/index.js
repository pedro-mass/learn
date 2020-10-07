import { renderApp } from './ui'
import { Fn } from '../lib/types'
import { over, lensProp, remove, append } from 'ramda'
const { ask } = Fn

const L = { habits: lensProp('habits') }

// lib
const Merge = x => ({
  x,
  concat: other => Merge(Object.assign({}, x, other.x)),
})

// controller
const create = habit => ask.map(over(L.habits, append(habit)))
// const create = (state, habit) =>
// over(L.habits, append(habit), state)
// Object.assign({}, state, { habits: [habit] })

const destroy = ({ idx }) => ask.map(over(L.habits, remove(idx, 1)))
// const destroy = (state, { idx }) =>
//   over(L.habits, remove(idx, 1), state)
// Object.assign({}, state, { habits: [] })

const view = ({ idx }) => Fn.of({ page: 'show', index: idx })
// Object.assign({}, state, { page: 'show', index: idx })

const route = { create, destroy, view }

// view
const appLoop = state =>
  renderApp(state, (action, payload) =>
    appLoop(Merge(state).concat(Merge(route[action](payload).run(state))).x)
  )

appLoop({ page: 'list', habits: [] })
