import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
      event.preventDefault()

      let nameExists = false

      persons.forEach(function(item) {
          if (item.name === newName) {
              nameExists = true
          }
      })

      if (nameExists) {
        const confirmed = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
        if (confirmed) {
          const person = persons.find(p => p.name === newName)
          const changedPerson = { ...person, number: newNumber }

          personService
            .update(changedPerson.id, changedPerson)
              .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
              setErrorMessage(
                `${changedPerson.name} changed succesfully`
              )
              setTimeout(() => {
                setErrorMessage('')
              }, 2000)
            })
            .catch(error => {
              setErrorMessage(
                `${changedPerson.name} was already removed from server`
              )
              setTimeout(() => {
                setErrorMessage('')
              }, 2000)
            })
        }
      } else {
        const personObject = {
            name: newName,
            number: newNumber
        }
        
        personService
            .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setErrorMessage(
                `${returnedPerson.name} added succesfully`
              )
              setTimeout(() => {
                setErrorMessage('')
              }, 2000)
            })
            .catch(error => {
              console.log(error.response.data)
              setErrorMessage(
                `Message: ${error}`
              )
            })
      }
      setNewName('')
      setNewNumber('')
      setNewFilter('')
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const FilteredPersons = ({persons}) => {
      const filteredpersons = persons.filter(person => person.name.includes(newFilter))
    return (filteredpersons.map(person => <Person key={person.name} person={person}/>))
  }

  const Person = ({person}) => {
    return <li>{person.name} {person.number} <button onClick={() => handleRemove(person)}>Delete</button></li>
  }

  const Header = ({text}) => {
    return <h2>{text}</h2>
  }

  const handleRemove = person => {
    const confirmed = window.confirm(`Delete ${person.name}`);
    
    if (confirmed) {
      personService
        .remove(person.id)
        .then( () => {
          personService
            .getAll()
            .then(remainingPersons => {
            setPersons(remainingPersons)
            })
          setErrorMessage(
            `${person.name} removed succesfully`
          )
          setTimeout(() => {
            setErrorMessage('')
          }, 2000)
        })
    }
  }

  return (
    <div>
      <Header text="Phonebook"/>
      <Notification message={errorMessage} />
      <div>filter: <input value={newFilter} onChange={handleFilterChange}/></div>
      <Header text="Add a new"/>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <Header text="Numbers"/>
      <ul><FilteredPersons persons={persons}/></ul>
    </div>
  )

}

export default App