import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '021-391-909'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPersons =[...persons]
    /*
    This works, but some is more elegant
    const nameCheck=newPersons.map(person=>person.name)
    const existingUser = nameCheck.includes(newName)
    */
    const existingUser = newPersons.some(person=>person.name===newName)
    existingUser
      ?alert(`${newName} has already been added to phone book`)
      :setPersons(newPersons.concat({name: newName,number: newNumber}))
    
  }

    return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <br></br>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
      </div>
    </div>
  )
}

export default App