import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnec } from '../reducers/anecdoteReducer'
import { newNotif } from '../reducers/notifReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnec = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(newAnec(content))
    dispatch(newNotif(`You created new note '${content}'!`, 1))
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={createAnec}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm