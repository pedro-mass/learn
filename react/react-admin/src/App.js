// in src/App.js
import React from 'react'
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import PostIcon from '@material-ui/icons/Book'
import UserIcon from '@material-ui/icons/Group'
import { UserList } from './users'
import { PostList, PostEdit, PostCreate } from './posts'
import Dashboard from './dashboard'
import authProvider from './authProvider'

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')
const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource name="users" list={UserList} icon={UserIcon} />
  </Admin>
)

export default App
