import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'
import weatherService from './services/weather'
import Finder from './components/Finder'
import Country from './components/Country'
import CountryList from './components/CountryList'

function App() {
  const [text, setNewText] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState('')

  useEffect(() => {
    
    if (text) {
    countriesService.getAll()
      .then(response => {   
        const filtered = response.filter(country => country.name.common.toLowerCase().includes(text.toLowerCase()))
        if (filtered.length===1){
          updateWeather(filtered[0].capital)
      }  
         setCountries(filtered) 
      })

    }
  }, [text])

  const handleTextChange = (event) => {
    setNewText(event.target.value)
  }

  const handleShowCountry = (countryName) => {
      countriesService.getOneCountry(countryName)
      .then(response => {
        updateWeather(response.capital[0])
        setCountries([response])
      })

  }

  const updateWeather = (city) => {
      weatherService.getWeather(city)
      .then(response => {
        setWeather(response)
      })
  }

  return (
    <div>
      <Finder text={text} onChange={handleTextChange} />
      <CountryList 
        countries={countries} 
        onClick={handleShowCountry} 
        weather={weather}/>
    </div>
  )
}

export default App
