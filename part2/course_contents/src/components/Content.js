import React from 'react'
import Part from './Part.js'

const Content = ({parts}) => {

  const getSum = (cumulative, currentVal) => cumulative + currentVal

  return (
  	<div>
  	{parts.map((part) => 
  		<Part name={part.name}
  			  exercises = {part.exercises}
  			  key = {part.id} />
  	)}

  	<p> <strong> Total of {parts.map((part) => part.exercises).reduce(getSum)} exercises </strong> </p>
  	</div>
  )
}

export default Content