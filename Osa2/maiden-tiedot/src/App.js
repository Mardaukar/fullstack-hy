import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const FilteredCountries = ({countries}) => {
    const filteredcountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    if (filteredcountries.length > 10) {
      return "Too many matches, specify another filter."
    } else if (filteredcountries.length === 1) {
      return <div><Country country={filteredcountries[0]} /></div>
    } else {
      return (filteredcountries.map(country => <FilteredCountry key={country.name} country={country}/>))
    }
  }

  const FilteredCountry = ({country}) => {
    return (
      <>
        <p key={country.name}>{country.name} <button onClick={() => setNewFilter(country.name)} >Show</button></p>
      </>
    )
  }

  const Country = ({country}) => {
    return (
      <>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} height="60" width="60"></img>
      </>
    )
  }

  return (
    <div>
      <div>filter: <input value={newFilter} onChange={handleFilterChange}/></div>
      <div><FilteredCountries countries={countries}/></div>
    </div>
  )

}

export default App