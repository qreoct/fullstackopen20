import React, {useState} from 'react'
import BlogUserInfo from './BlogUserInfo.js'
import '../styles/blog.css'

import { useDispatch } from 'react-redux'
import { likeBlog, delBlog } from '../reducers/blogReducer'

import {
	Link
} from "react-router-dom"

const Blog = ({ blog }) => {

	const [visible, setVisible] = useState(true)

	const dispatch = useDispatch()

	const toggleVisible = () => {
		setVisible(!visible)
	}

	const hideWhenVisible = { display: visible? 'none': ''}

	const loggedIn = JSON.parse(window.localStorage.getItem('loggedInBlogUser'))
	const currUser = (loggedIn && (loggedIn.username === blog.user.username)) ? true : false

	const handleLike = async (id) => {
		let toUpdate = {
			...blog,
			likes: blog.likes + 1
		};
		await dispatch(likeBlog(id, toUpdate))
	}

	const handleDel = async (id) => {
		if (window.confirm("Are you sure you want to delete?")){
			await dispatch(delBlog(id))
		}
	}

	return(
	  <div className="blogwrapper">
	  <div className="blogmaximise" onClick={toggleVisible}> + </div>
	  {currUser ? <div className="blogdelete" onClick={() => handleDel(blog.id)}> x </div> : <div></div>}
	  <li>
	  <Link to={`/blogs/${blog.id}`} style={{textDecoration: 'none'}}>
	  <span className="blogtitle">
	    {blog.title}
	  </span> 
	  </Link>
	  <p> <span onClick={() => handleLike(blog.id)} className="bloglikes"> &#8679; {blog.likes} </span> </p>

	  <div style={hideWhenVisible} className="blogauthoruser">
	  Author: {blog.author} <br/>
	  Posted by <BlogUserInfo user={blog.user}/>
	  </div>
	  </li>
	  </div>
	)
}

export default Blog
