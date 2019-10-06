import React from 'react'
import { observer } from 'mobx-react'
import { values } from 'mobx'

export const UserPicker = observer(props => (
  <select
    value={props.user ? props.user.id : ''}
    onChange={e => props.onChange(e.target.value)}
  >
    <option value="">-none-</option>
    {values(props.store.users).map(user => (
      <option value={user.id}>{user.name}</option>
    ))}
  </select>
))
UserPicker.displayName = 'UserPickerView'
