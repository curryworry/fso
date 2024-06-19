import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Weather = ({country}) => {
  console.log('singlecountry',country)
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [weather, setWeather] = useState({})
  useEffect(()=>{
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},{},${country.cca3}&limit=1&appid=${api_key}`)
    .then(response=>{
      setLat(response.data[0].lat)
      setLong(response.data[0].lon)
    })
  },[country.capital, country.cca3, lat, long])
  
  useEffect(()=>{
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`)
    .then(response=>{
      console.log(response.data)
      setWeather({
        temperature: response.data.main.feels_like,
        wind: response.data.wind.speed,
        icon: response.data.weather[0].icon
      })
    })
  },[lat,long])

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.temperature} celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
      <p>wind {weather.wind} m/s</p>
    </div>
  )
}

const CountryDetails = ({country}) => {
  const languages = Object.values(country.languages)
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {languages.map(language=><li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt="" />
        <Weather country={country}/>
      </div>
    )
}

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
      return(
        <CountryDetails country={singleCountry}/>
      )
    }
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
 