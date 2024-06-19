import { useState, useEffect } from 'react'
import axios from 'axios'



const Display = ({countryList, setFilteredArray, allCountries}) => {
  const [singleCountry, setSingleCountry] = useState({})
  //console.log('DIsplay countrylist',countryList)
  //console.log('re-rendered');
  useEffect(()=>{
    if(countryList.length===1){
    //console.log('country is',countryList[0])
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryList[0].name.common}`)
    .then(response=>{
      setSingleCountry(response.data)
    })
    //console.log(singleCountry)
    }
    else{
      setSingleCountry({})
    }
  },[countryList])

  const handleShow = (countryCode) => {
    //console.log(countryCode)
    setFilteredArray(allCountries.filter(country=>country.cca3===countryCode))
  }

  if(countryList.length>10){
    return(<div>Too many matches, specify another filter</div>)
  }
  if(countryList.length>1){
  return(
    <div>
      {countryList.map(country=> <div key={country.cca3}>{country.name.common}<button onClick={()=>handleShow(country.cca3)}>show</button></div>)}
    </div>
  )}
  if(countryList.length==1){
    //console.log('singleCountry',singleCountry)
    if(Object.keys(singleCountry).length>0){
    const languages = Object.values(singleCountry.languages)
    return(
      <div>
        <h2>{singleCountry.name.common}</h2>
        <p>capital {singleCountry.capital}</p>
        <p>area {singleCountry.area}</p>
        <h3>languages:</h3>
        <ul>
          {languages.map(language=><li key={language}>{language}</li>)}
        </ul>
        <img src={singleCountry.flags.png} alt="" />
      </div>
    )}
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [filteredArray, setFilteredArray] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(()=>{
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response=>{
      setAllCountries(response.data)
      //console.log(allCountries)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    if(search!==''){
      setFilteredArray(allCountries.filter(country=>country.name.common.toLowerCase().includes(search.toLowerCase())))
    }
    else{
      setFilteredArray([])
    }
  },[search,allCountries])


  const searchHandler = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <form>
        <div>
          find countries: <input onChange={searchHandler}/>
        </div>
      </form> 
      <div>
        <Display countryList={filteredArray} setFilteredArray={setFilteredArray} allCountries={allCountries}/>
      </div> 
    </>
  )
}

export default App
 