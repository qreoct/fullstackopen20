import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'

import anecdoteService from './services/anecdotes'
import { initAnec } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnec())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <FilterForm />
      <h2> Anecdotes </h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App