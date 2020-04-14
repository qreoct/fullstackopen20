import React from 'react'

const Person = (props) => {
  const {name,number,handleDel} = props
  return(
  	<div>
      <span> {name}, {number} </span> 
      <button onClick = {handleDel} > delete </button>
    </div>
  )
}

export default Person