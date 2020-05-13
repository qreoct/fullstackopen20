import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { voteNotif, hideNotif, newNotif } from '../reducers/notifReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') { 
      return state.anecdotes 
    }
    else {
      // using the same trick from part 3 phonebook frontend
      return state.anecdotes.filter((a) => a.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
    }
  })
  const dispatch = useDispatch()

  const vote = async (id, content) => {
    dispatch(addVote(id))
    //2nd arg of newNotif is the duration of notification in seconds
    dispatch(newNotif(`You voted for '${content}'!`, 2))
  }

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          score: {anecdote.votes} &nbsp;
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          <hr />
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList