import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import Commentform from './Commentform'

const BlogDetail = ({ blog }) => {
	const dispatch = useDispatch()

	const b = blog
	if(!b) {
		return null
	}

	const handleLike = async (id) => {
	let toUpdate = {
		...blog,
		likes: blog.likes + 1
	};
	await dispatch(likeBlog(id, toUpdate))
	}

	return(
		<div>
		<h3>
			{b.title} by {b.author}
		</h3>

		<p> url: {b.url} </p>
		<p> ♥: {b.likes} <button style={{backgroundColor:'limegreen'}} className="button4" onClick={() => handleLike(b.id)}> like </button> </p>
		<p> added by 
			<Link to={`/users/${b.user.id}`}> {b.user.username} </Link>
		</p>

			{blog.comments.length === 0 
				? <div> <h3> comments </h3>
				  <em> No comments yet... Be the first to add one! </em> </div>

				: <div> <h3> comments ({blog.comments.length}) </h3>
				  <ul> {blog.comments.map(c => <li key={c}> {c} </li>)} </ul> </div> }
		<hr />
		<Commentform id={b.id}/>
		</div>

	)
}

export default BlogDetail