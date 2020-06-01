import React from 'react'

const Anecdote = ({anecdote}) => {
	return (
		<div>
			<h1> {anecdote.content} </h1>
			<p> by {anecdote.author} </p>
			<a href = {anecdote.info} > for more info </a>
			<p> has {anecdote.votes} votes </p>
		</div>
	)
}

export default Anecdote