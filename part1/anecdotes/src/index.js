import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, score}) => {
	return(
			<div>
			<p> {text} </p>
			<p> has {score} votes </p>
		</div>
	)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [score, setScore] = useState(Array(anecdotes.length).fill(0))
  const [largest, setLargest] = useState(0)

  const castVote = (selected) => {
  	const copy = [...score]
  	copy[selected] += 1
  	setScore(copy)
  	setLargest(getLargestIndex(copy))
  }

  const getLargestIndex = (arr) => {
  	// returns the var maxi which is the index of the largest value in the array
  	let max = 0
  	let maxi = 0
  	for(let i = 0; i < arr.length; i++){
  		if (arr[i] > max){
  			maxi = i;
  			max = arr[i];
  		}
  	}
  	return maxi
  }

  return (
    <div>
   	  <h1> anecdote </h1>
   	  <Anecdote text = {props.anecdotes[selected]} score = {score[selected]} />
      <button onClick = {() => castVote(selected)}>
      	vote
      </button>
      <button onClick = {() => setSelected(Math.floor(Math.random()*anecdotes.length))}>
      	next anecdote
      </button>

      <h2> anecdote with most votes </h2>
      <Anecdote text = {props.anecdotes[largest]} score = {score[largest]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'New anecdote?',
  `A student enquired of Master Wq, “When will I know I have mastered Vimscript?”
  Master Wq answered, “When you never use it.”`
]


ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)