import React from 'react'

const Person = (props) => {
  const {name,number} = props
  return(
  	<div>
      <p> {name}, {number} </p> 
    </div>
  )
}

export default Person