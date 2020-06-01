import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import { newNotif } from './reducers/notifReducer'

import Login from './components/Login'

import blogService from './services/blogs'
import Blog from './components/Blog'
import { initBlogs } from './reducers/blogReducer'
import BlogDetail from './components/BlogDetail'

import { setUser } from './reducers/userReducer'

import Blogform from './components/Blogform'

import Menu from './components/Menu'

import { initAccounts } from './reducers/accountReducer'
import User from './components/User'
import UserDetail from './components/UserDetail'

import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'

const App = () => {
  const blogs = useSelector((state) => {
    if(!state.blog) { return [] }
    else { return state.blog }
  })
  const user = useSelector((state) => {
    return state.user
  })
  const accs = useSelector((state) => {
    return state.accounts
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newNotif('Welcome~!', 'Standard', 2))
  },[dispatch])


  //get all blogs on page load
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])
  useEffect(() => {
    dispatch(initAccounts());
  }, [dispatch])

  // if Route (url) matches the form /users/:id, get the id from params
  const matchUser = useRouteMatch('/users/:id')
  const acc = matchUser
    ? accs.find(a => a.id === matchUser.params.id)
    : null

  // similarly for blogs
  const matchBlog = useRouteMatch('/blogs/:id')
  const blg = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  //check if user is logged in on page load
  useEffect(() => {
    console.log('checking if user is logged in...')
    console.log('current user is ', window.localStorage.getItem('loggedInBlogUser'))
    const loggedUser = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = (e) => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to log out of ${user.username}?`)){
    window.localStorage.clear()
    window.location.reload(true)
    }
  }

  return (
    <div>
      <Notification />
      <h1> Part7: Redux Blogs </h1>
      <Menu user={user.name} logoutHandler={handleLogout}/>

      <Switch>
      <Route path="/blogs/:id">
        <BlogDetail blog={blg} />
      </Route>

      <Route path="/users/:id">
        <UserDetail acc={acc} />
      </Route>

      <Route path="/users">
        <h2> Users </h2>
        <table>
        <thead>
          <td>  </td>
          <td> <em> blogs created </em> </td>
        </thead>
        <tbody>
        {accs.map(acc => 
          <User key={acc.id} acc={acc} />
        )}
        </tbody>
        </table>
      </Route>

      <Route path="/">
        {Object.keys(user).length === 0? 
        <Login />
        :
          <div>
            <Blogform />
            <ol>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog}/>
            )}
            </ol>
          </div>
        }
      </Route>
      </Switch>
    </div>
  )
}

export default App
