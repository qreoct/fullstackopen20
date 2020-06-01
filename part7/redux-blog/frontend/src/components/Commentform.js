import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { newComment } from '../reducers/blogReducer'

const Commentform = (props) => {

	const dispatch = useDispatch()
	const id = props

	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		setVisible(!visible)
	}

	const hideWhenVisible = { display: visible? 'none': ''}
	const showWhenVisible = { display: visible? '': 'none'}

	const handleCreate = (e) => {
		e.preventDefault()
		const comment = e.target.comment.value
		console.log('comment: ', comment)
		console.log('id: ', id)
		dispatch(newComment({id, comment}))
		toggleVisible();
		window.location.reload()
	}

	return(
	<div>
		<div style={hideWhenVisible}>
		<button className="button4" onClick={toggleVisible}> submit new comment </button>
		</div>

		<div style={showWhenVisible}>
		<h3> Submit new comment </h3>
		<form onSubmit={handleCreate}>
			<span className="formlabel"> Comment: </span>
			<textarea type="text" id="title" name="comment" /> <br />
			<input style={{backgroundColor: 'limegreen'}} className="button4" type="submit" id="newcomment-btn" value="post"/>
			<input style={{backgroundColor: '#444'}} className="button4"  type="button" value="cancel" onClick={toggleVisible} />
		</form>
		</div>
	</div>
	)
}

export default Commentform