import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/users.css'

const UserDetail = ({ acc }) => {

	const user = acc
	if(!user) {
		return null
	}

	return(
		<div>
		<h3>
			{acc.name}
		</h3>
		<p> <em> added blogs: </em> </p>

		<ul>
			{acc.blogs.length > 0 ? acc.blogs.map(blog => (
				<li> <Link to={`/blogs/${blog.id}`} key={blog.id}>
					{blog.title}
				</Link> </li>
			)) : <p> no blogs added yet... </p>}
		</ul>
		</div>

	)
}

export default UserDetail