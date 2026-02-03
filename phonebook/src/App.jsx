import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import phonebook from './services/phonebook'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])  
  const [statusMsg, setStatusMsg] = useState('')

  const hook = ()=>{
    console.log('executing hook');
    
    // axios.get('http://localhost:3001/persons')
    // .then(response =>{
    //   console.log(response.data);
    //   setPersons(response.data)
    // })
    phonebook.getAll()
    .then(data=>{
      console.log(data);
      setPersons(data)
    })
    
  }
  useEffect(hook, [statusMsg])
  const handleChange = (event)=>{
    setNewName(event.target.value)
  }
  const handleSearchTerm = (event)=>{
    const value = event.target.value
    setSearchTerm(value) // we have to do this becsuse in the slice line , search term may not get updated , as setState is async
   const MatchingContacts = value === ''? [] : (persons.filter((person)=>{
      return person.name.toLowerCase().startsWith(value.toLowerCase())
    })
  )
    setSearchResult(MatchingContacts)
}
  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(newName ===''|| newNumber===''){
      alert('please fill in both fields')
      return
    }
    if(persons.some( (person)=>{
      return person.name.toLowerCase() === newName.toLowerCase()
    })){
      if(window.confirm(`${newName} already exists in the book , do  you wnat to update the number`)){
        const p =  persons.find(person=>{
          return person.name.toLowerCase() === newName.toLowerCase()
        })
      const newObj = { ...p, number: newNumber}
      phonebook.update(p.id, newObj).then(data=>{
         setPersons(persons.map(person => {
        return p.id === person.id ? data : person
      }) )
        setStatusMsg(`Number of ${newObj.name} updated`)
      setTimeout(()=>{
        setStatusMsg(``)
      },2000)
      })
      .catch(err =>{
        setStatusMsg('Error while updating (previously this was contct not found in server which is false')
        setTimeout(()=> setStatusMsg(''),2000)
      })
     setNewNumber('')
     setNewName('')
     return //exit from this function after updation

      }else{
        return 
      }

    }
    const newObj = {
      name: `${newName}`,
      number:newNumber
    }
    phonebook.create(newObj)
    .then(data=>{
      setStatusMsg(`${data.name} added`)
      setPersons(persons.concat(data))
    setNewNumber('')
    setNewName('')
      setTimeout(()=>{
        setStatusMsg(``)
      },2000)
    }).catch(err =>{
      console.log(err);
      
    })
    // setPersons(persons.concat(newObj)) 
  }

  const DeleteContact = id =>{
      const p = persons.find(p => p.id===id)
      if(window.confirm(`Delete ${p.name}`)){

      console.log(`person with ${id} wants to be deleted`);
      phonebook.deleteData(id).then(data =>{
        setPersons( persons.filter(person => person.id !== id))
      setStatusMsg(` ${p.name} deleted`)
      setTimeout(()=>{
        setStatusMsg(``)
      },2000)
      })
      .catch(err =>{
        setStatusMsg('Contact alrady delted from server')
        setTimeout(()=>setStatusMsg(''), 2000)
      })
    }
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMsg}/>
      <Filter searchResult={searchResult} handleSearchTerm={handleSearchTerm} searchTerm={searchTerm}  />
      <h2>Add A new Contact</h2>

     <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit}  handleNumberChange={handleNumberChange} handleChange={handleChange}/> 

      <h2>Numbers</h2>

      {/* <Persons persons={persons} handleDelete={()=>DeleteContact()}/> */}
      {persons.map(person =>{
        return <Person key={person.id} person={person} handleDelete={()=>DeleteContact(person.id)} />
      })}
    <div>
    </div>
    </div>

  )
}

export default App