import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Person from './components/Person.js'
import Notification from './components/Notification.js'
import personService from './services/persons.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null) 

  const handleName = (e) => {
    setNewName(e.target.value)
  }
  const handleNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilter = (e) => {
    setFilter(e.target.value)
    console.log(filter)
  }

  useEffect(() => {
    personService
      .getAll()
      .then((res)=>{
        setPersons(res)
      })
  }, [])


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
      
      if (window.confirm(`${newName} already exists in records! Update number?`)){
        const newPerson = {
          name: newName, //or just newName
          number: newNumber
        }
        const newPersonID = persons.find((p) => p.name === newName).id
        personService
          .update(newPersonID, newPerson)
          .then((changedPerson) => {
            setPersons(persons.map( p => p.id !== newPersonID ? p : changedPerson))
            setMessage(`Number for ${newName} was updated!`)
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          })
          .catch(err =>{
            setMessage(`ERROR: Person ${newName} was already removed!`)
            setPersons(persons.filter( p => p.id !== newPersonID))
            setTimeout(() => {
              setMessage(null)
            }, 10000)
          })
      }
      // reset fields
      setNewName('')
      setNewNumber('')
    }else{
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then((res) => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
          setMessage(`New person ${newName} was added!`)
            setTimeout(() => {
              setMessage(null)
            }, 2000)
        })
        .catch((e) => {
          setMessage(`ERROR: Name must have at least 3 characters. Number must have at least 8 characters`)
            setTimeout(() => {
              setMessage(null)
          }, 2000)})
    }
  }

  const delPerson = (id) => {
    // find and get the name of the person whose id is the current id
    if (window.confirm(`Are you sure to delete ${persons.find(p => p.id === id).name}?`)){
      personService
        .del(id)
        .then( (res) => {
          // make new array of persons where only id is excluded
          setPersons(persons.filter((p) => p.id !== id))
        })
      console.log(`i have deleted ${id}!`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <h3> Add new person </h3>
      <PersonForm nameVal = {newName} nameHandler = {handleName}
                  numberVal = {newNumber} numberHandler = {handleNumber}
                  btnHandler = {addPerson} />
      <h3>Filter by name</h3>
      <Filter filterVal={filter} filterHandler = {handleFilter} />
      <h3>Contacts</h3>

      {displayList.map((person, i) => 
        <Person key = {i} name = {person.name} number = {person.number} 
                handleDel = {() => delPerson(person.id)}/>
      )}
    </div>
  )
}

export default App