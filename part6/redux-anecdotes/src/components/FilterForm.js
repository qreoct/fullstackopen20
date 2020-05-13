import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAnec } from '../reducers/filterReducer.js'

const FilterForm = () => {

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const content = e.target.value
    dispatch(filterAnec(content))
  }

  return (
    <div>
      <h2> Filter </h2>
      <input type="text" name="filter" onChange={handleChange}/>
    </div>
  )
}

export default FilterForm