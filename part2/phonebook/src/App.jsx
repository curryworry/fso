import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    let search = e.target.value;
    const chosenPersons = [...persons];
    setFilteredPersons(
      chosenPersons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())))
  }

  const handleNameChange = (e) => {
    //console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    //console.log(e.target.value)
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
      :setPersons(newPersons.concat({name: newName,number: newNumber})),setFilteredPersons(newPersons.concat({name: newName,number: newNumber}))
  }

    return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input onChange={handleSearch}/>
        </div>
      <h2>Add A New Entry</h2>
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
        {filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
      </div>
    </div>
  )
}

export default App