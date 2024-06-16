import { useState,useEffect } from 'react'
//import axios from 'axios'
import phoneService from './services/phoneService'

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
  
  const deletePerson = (id,name) => {
  const confirmation = confirm(`Delete ${name}?`)
  if(confirmation){phoneService.deleteRecord(id)}
  }

  return (
    <div>
        {filteredPersons.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={()=>deletePerson(person.id,person.name)}>delete</button></div>)}
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
    phoneService.getAll().then(allRecords=>{
      setPersons(allRecords)
      setFilteredPersons(allRecords)
    })
    ,[]})


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
    const existingUser = newPersons.find(person=>person.name===newName)
    if(existingUser){
      const confirmation = confirm(`${existingUser.name} already exists. Update number?`)
      console.log(existingUser);
      if(confirmation){phoneService.update(existingUser.id, {name: existingUser.name,number: newNumber,id: existingUser.id})}
    }
    else{
      phoneService
      .create({name: newName,number: newNumber,id:`${persons.length+1}`})
      .then(newRecord=>{
        setPersons(newPersons.concat(newRecord))
        setFilteredPersons(newPersons.concat(newRecord))
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