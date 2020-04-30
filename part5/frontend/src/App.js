import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'
import Blogform from './components/Blogform'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null) 

  const handleUser = (e) => {
    e.preventDefault();
    setUsername(e.target.value)
  }

  const handlePw = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.clear()
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      )
      setMessage(`Successfully logged in with user ${username}!`)
      setTimeout(() => {setMessage(null)}, 2000)
      setUsername('')
      setPassword('')
    } catch (exception){
      setMessage(`ERROR: Invalid username/password!`)
      setTimeout(() => {setMessage(null)}, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    if (window.confirm(`Are you sure you want to log out of ${user.username}?`)){
    window.localStorage.clear()
    window.location.reload(true)
    }
  }

  // function for managing blog creation
  const handleBlog = async (obj) => {
    console.log(obj)
    try{
    const post = await blogService.create(obj)
    setBlogs(sortBlogs(blogs.concat(post)))
    setMessage(`New post created :)`)
    setTimeout(() => {setMessage(null)}, 3000)
    }catch{
      setMessage(`ERROR: Blog post not allowed`)
      setTimeout(() => {setMessage(null)}, 3000)
    }
  }

  // function for adding likes to a blog
  const handleLike = async (id) => {
    let toUpdate;
    blogs.map(b => {
      if (b.id === id){
        b.likes += 1
        toUpdate = b
      }
    }) 
    console.log(blogs)
    const put = await blogService.update(id, toUpdate)
    setBlogs(sortBlogs(blogs.map(b => b.id === id ? put : {...b})))
  }

  // function for deleting
  const handleDel = async (id) => {
    if (window.confirm("Are you sure you want to delete?")){
      const del = await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  //sort blogs according to likes
  const sortBlogs = (arr) => {
    const sorted = arr.sort((a,b) => b.likes - a.likes)
    return sorted
  }

  //get all blogs on page load
  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( sortBlogs(blogs) )
    }
    )  
  }, [])

  //check if user is logged in on page load
  useEffect(() => {
    console.log('checking if user is logged in...')
    console.log('current user is ', window.localStorage.getItem('loggedInBlogUser'))
    const loggedUser = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  return (
    <div> <Notification message={message} />
    {!user ?
    <Login userHandler = {handleUser} pwHandler = {handlePw}
           loginHandler = {handleLogin} />
           :
        <div>
        <h2>Blogs</h2>
        Currently logged in as {user.username} {user.name} [<span className = "logout" onClick = {handleLogout} >logout</span>]
        
        <Blogform createHandler = {handleBlog}/>

        <ol>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeHandler={handleLike} delHandler={handleDel}/>
        )}
        </ol>
        </div>
      }
    </div>
  )

}

export default App