import React from 'react'

const Filter = (props) => {
  const filterVal = props.filterVal
  const filterHandler = props.filterHandler
  return(
  	<div>
      <input type="text" value={filterVal} onChange={filterHandler} /> 
    </div>
  )
}

export default Filter