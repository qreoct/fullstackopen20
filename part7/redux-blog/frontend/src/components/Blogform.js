import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { newBlog } from '../reducers/blogReducer'

const Blogform = (props) => {

	const dispatch = useDispatch()

	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		setVisible(!visible)
	}

	const hideWhenVisible = { display: visible? 'none': ''}
	const showWhenVisible = { display: visible? '': 'none'}

	const handleCreate = (e) => {
		e.preventDefault()
		const title = e.target.title.value
		const author = e.target.author.value
		const url = e.target.url.value
		const likes = e.target.likes.value
		dispatch(newBlog({title, author, url, likes}))
		toggleVisible();
	}

	return(
	<div>
		<div style={hideWhenVisible}>
		<button onClick={toggleVisible} className="button4"> submit new blog </button>
		</div>

		<div style={showWhenVisible}>
		<h3> Submit new blog </h3>
		<form onSubmit={handleCreate}>
			<p>
			<span className="formlabel"> Title: </span>
				<input type="text" id="title" name="title" className="formfield"/> <br />
			</p>
			<p>
			<span className="formlabel"> Author: </span>
				<input type="text" id="author" name="author" className="formfield" /> <br />
			</p>
			<p>
			<span className="formlabel"> Url: </span>
				<input type="url" id="url" name="url" className="formfield" /> <br />
			</p>
			<p>
			<span className="formlabel"> Likes: </span>
				<input type="text" id="likes" name="likes" className="formfield" /> <br />
			</p>
			<input style={{width: '6em', backgroundColor:'limegreen'}} className="button4" type="submit" id="newblog-btn" value="create"/>
			<input style={{width: '6em', backgroundColor: '#444'}}className="button4" type="button" value="cancel" onClick={toggleVisible} />

		</form>
		</div>
	</div>
	)
}

export default Blogform