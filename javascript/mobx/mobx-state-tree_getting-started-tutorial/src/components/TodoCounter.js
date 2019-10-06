import React from 'react'
import { observer } from 'mobx-react'

export const TodoCounter = observer(props => (
  <div>
    {props.store.pendingCount} pending, {props.store.completedCount} completed
  </div>
))
TodoCounter.displayName = 'TodoCounterView'
