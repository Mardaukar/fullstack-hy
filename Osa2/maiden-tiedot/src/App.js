import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ weather, setWeather ] = useState(
    {
    "coord": {"lon": -122.08,"lat": 37.39},
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 296.71,
      "pressure": 1013,
      "humidity": 53,
      "temp_min": 294.82,
      "temp_max": 298.71
    },
    "visibility": 16093,
    "wind": {
      "speed": 1.5,
      "deg": 350
    },
    "clouds": {
      "all": 1
    },
    "dt": 1560350645,
    "sys": {
      "type": 1,
      "id": 5122,
      "message": 0.0139,
      "country": "US",
      "sunrise": 1560343627,
      "sunset": 1560396563
    },
    "timezone": -25200,
    "id": 420006353,
    "name": "Mountain View",
    "cod": 200
  })

  const [ currentCity, setCurrentCity ] = useState('helsinki')

  const getter = () => {
    axios
        .get('https://api.openweathermap.org/data/2.5/weather?q=' + currentCity + '&appid=e47f22bdb6bedf9e9f825bc1c1e1e8d9')
        .then(response => {
          setWeather(response.data)
        })
  }

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
      setCurrentCity(filteredcountries[0].capital)
      console.log(currentCity)
      setTimeout(function(){
        getter();
      }, 10000);
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
        <h2>weather in {country.capital}</h2>
        <p>{weather.weather[0].description}</p>
        <p>temperature: {Math.floor(weather.main.temp - 273)} Celsius</p>
        <p>wind {weather.wind.speed} to direction {weather.wind.deg}</p>
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