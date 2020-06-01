import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'

const AnecdoteForm = (props) => {
  
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const reset = useField('button')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotif({
      content: content.value
    })
    history.push('/')
  }

  const handleReset = (e) => {
  	e.preventDefault()
  	content.reset()
  	author.reset()
  	info.reset()
  }




  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <input {...reset} value="reset" onClick={handleReset}/>
      </form>
    </div>
  )
}

export default AnecdoteForm