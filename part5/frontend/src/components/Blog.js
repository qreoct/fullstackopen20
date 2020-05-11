import React, {useState} from 'react'
import User from './User.js'
import '../styles/blog.css'


const Blog = ({ blog, likeHandler, delHandler }) => {

	const [visible, setVisible] = useState(true)

	const toggleVisible = () => {
		setVisible(!visible)
	}

	const hideWhenVisible = { display: visible? 'none': ''}

	const loggedIn = JSON.parse(window.localStorage.getItem('loggedInBlogUser'))
	console.log(loggedIn)
	console.log(blog)
	const currUser = (loggedIn && (loggedIn.username === blog.user.username)) ? true : false

	return(
	  <div className="blogwrapper">
	  <div className="blogmaximise" onClick={toggleVisible}> + </div>
	  {currUser ? <div className="blogdelete" onClick={() => delHandler(blog.id)}> x </div> : <div></div>}
	  <li>
	  <a href={blog.url} style={{textDecoration: 'none'}}>
	  <span className="blogtitle">
	    {blog.title}
	  </span> 
	  </a>
	  <p> <span onClick={() => likeHandler(blog.id)} className="bloglikes"> &#8679; {blog.likes} </span> </p>

	  <div style={hideWhenVisible} className="blogauthoruser">
	  Author: {blog.author} <br/>
	  Posted by <User user={blog.user}/>
	  </div>
	  </li>
	  </div>
	)
}

export default Blog
