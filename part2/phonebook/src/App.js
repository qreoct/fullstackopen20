import React, { useState } from 'react'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Person from './components/Person.js'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '8282 8383'},
    { name: 'Zack', number: '9465 3211'},
    { name: 'Cody', number: '8886 4666'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleName = (e) => {
    setNewName(e.target.value)
  }
  const handleNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const displayList = filter
  // 1. runs a filter function on the persons array of objects
  // 2. take each name and turn it to lowercase, check if it contains the query (var called 'filter')
  //    by using indexOf, so it searches the whole string for substring of query
  // 3. if indexOf doesn't find anything, it will return -1
    ? persons.filter((person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    : persons

  const addPerson = (e) => {
    e.preventDefault()
    if (!newName || !newNumber) {
      alert('Please make sure all fields are filled!')
      return 0
    }
    if (persons.map((person) => person.name).includes(newName)){
      // 1. make a new array (using map method) from the persons array containing only names
      // 2. using Array.includes() to check if newName already exists in current list of names
      alert(`${newName} already exists in records!`)
      setNewName('')
      setNewNumber('')
    }else{
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3> Add new person </h3>
      <PersonForm nameVal = {newName} nameHandler = {handleName}
                  numberVal = {newNumber} numberHandler = {handleNumber}
                  btnHandler = {addPerson} />
      <h3>Filter</h3>
      <Filter filterVal={filter} filterHandler = {handleFilter} />
      <h3>Contacts</h3>

      {displayList.map((person, id) => 
        <Person key = {id} name = {person.name} number = {person.number} />
      )}
    </div>
  )
}

export default App