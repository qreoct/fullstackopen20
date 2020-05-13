import anecService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const addVote = (id) => {
  return async dispatch => {
    const newA = await anecService.addVote(id)
    dispatch({
      type: 'ADD_VOTE',
      data: { id }
    })
  }
}
export const newAnec = (anecdote) => {
  return async dispatch => {
    const newA = await anecService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANEC',
      data: newA
    })
  }
}

export const initAnec = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch({
      type:'INIT_ANECS',
      data: anecs
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  // sorting function
  const compareVotes = (a,b) => {
    if (a.votes > b.votes) return -1
    else if (b.votes > a.votes) return 1
    else return 0
  }
  switch (action.type) {
    case 'ADD_VOTE': {
      const id = action.data.id
      const anecToChange = state.find(a => a.id === id)
      const newAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1
      }
      const ul = state.map(a => a.id !== id ? a : newAnec)
      return ul.sort(compareVotes)
    }
    case 'NEW_ANEC': {
      return [...state, action.data]
    }
    case 'INIT_ANECS': {
      return action.data.sort(compareVotes)
    }
    default:
      return state
  }
}

export default anecdoteReducer