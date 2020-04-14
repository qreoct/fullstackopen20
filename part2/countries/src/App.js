import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country.js'
import Warn from './components/Warn.js'

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([]) 
  const [warning, setWarning] = useState("Start by typing in a country name")
  const [display, setDisplay] = useState([])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    handleDisplay(e.target.value)
  }

  const handleDisplay = (query) => {
    const displayList = query
      ? countries.filter((country) => country.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      : countries
    if (displayList.length > 10){
      setWarning(`Too many results. Be more specific. err: ${displayList.length}`)
      setDisplay([])
    }else{
      setWarning(`${displayList.length} results found.`)
      setDisplay(displayList)
    }
  }

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((res) => {
      setCountries(res.data)
    })
  }

  useEffect(hook, [])

  return (
    <div>
    find countries: <input type="text" onChange={handleSearch} value={search}/>

    <Warn val = {warning} />
    {display.map((country,id) => 
      <Country key = {id} name={country.name} capital={country.capital}
               languages={country.languages}
               population={country.population} flag={country.flag}
               region={country.region} subregion={country.subregion}/>
    )}
    </div>
  );
}

export default App;
