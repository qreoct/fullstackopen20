import React, { useState } from 'react';

const Blogform = (props) => {

	const {createHandler} = props

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [likes, setLikes] = useState('')

	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		setVisible(!visible)
	}

	const hideWhenVisible = { display: visible? 'none': ''}
	const showWhenVisible = { display: visible? '': 'none'}

	const create = () => {
		console.log({title,author,url,likes})
		console.log(title,author,url,likes)
		createHandler({
			title, author, url, likes
		})
		setTitle('')
		setAuthor('')
		setUrl('')
		setLikes('')
		toggleVisible();
	}

	return(
	<div>
		<div style={hideWhenVisible}>
		<button onClick={toggleVisible}> submit new blog </button>
		</div>

		<div style={showWhenVisible}>
		<h3> Submit new blog </h3>
		Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/> <br />
		Author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/> <br />
		Url: <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}/> <br />
		Likes: <input type="text" value={likes} onChange={(e) => setLikes(e.target.value)}/> <br />
		<input type="submit" value="create" onClick={create} />
		<input type="submit" value="cancel" onClick={toggleVisible} />
		</div>
	</div>
	)
}

export default Blogform