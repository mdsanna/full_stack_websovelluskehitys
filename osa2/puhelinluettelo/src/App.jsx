import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  
  useEffect(() => {
    personsService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  
  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.some(person => person.name === newName)
    
    if (exists) {
        const confirmation=window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (confirmation) {
          const personObject = persons.find((person) => person.name === newName)
          const updatedObject = {...personObject, number: newNumber}

          personsService.update(updatedObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== updatedObject.id ? person : response))
              })
        }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
       }
      
      personsService.create(personObject)
       .then(response => {
        setPersons(persons.concat(response))
       })

      
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    console.log('removing person: ', person.name)
    const confirmation=window.confirm(`Delete ${person.name}?`)
    if (confirmation) {
      personsService.remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })

    }

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter 
          filter={newFilter}
          onChange={handleFilterChange} 
          />
      </div>
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}  
        handleNumberChange={handleNumberChange}  
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        filter={newFilter}
        remove={removePerson}
        />

    </div>
  )

}

export default App