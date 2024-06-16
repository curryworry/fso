import { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = ({changeHandler}) => {
  return(<div>
    filter shown with: <input onChange={changeHandler}/>
  </div>)
}

const PersonForm = ({submitHandler,nameHandler,numberHandler}) => {
 return ( <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameHandler}/>
        </div>
        <br></br>
        <div>
          number: <input onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> )
}

const Display = ({filteredPersons}) => {
  return (
    <div>
        {filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //const [search, setSearch] = useState('')

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      console.log('promise fulfilled')
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
    }
    ,[])

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
    This works, but 'some()' is more elegant
    const nameCheck=newPersons.map(person=>person.name)
    const existingUser = nameCheck.includes(newName)
    */
    const existingUser = newPersons.some(person=>person.name===newName)
    if(existingUser){
      alert(`${newName} has already been added to phone book`)
    }
    else{
      
      axios
      .post('http://localhost:3001/persons',{name: newName,number: newNumber,id:`${persons.length+1}`})
      .then(response => {
        setPersons(newPersons.concat(response.data))
        setFilteredPersons(newPersons.concat(response.data))
      })
    }
  }

    return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeHandler={handleSearch}/>
      <h2>Add A New Entry</h2>
      <PersonForm submitHandler={handleSubmit} nameHandler={handleNameChange} numberHandler={handleNumberChange}/>
      <h2>Numbers</h2>
      <Display filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App