import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'
import Finder from './components/Finder'
import Country from './components/Country'
import CountryList from './components/CountryList'

function App() {
  const [text, setNewText] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (text) {
    countriesService.getAll()
      .then(response => {      
        setCountries(response.filter(country => country.name.common.toLowerCase().includes(text.toLowerCase())))
      })
    }
  }, [text])

  const handleTextChange = (event) => {
    setNewText(event.target.value)
  }

  const handleShowCountry = (countryName) => {
      countriesService.getOneCountry(countryName)
      .then(response => {
        setCountries([response])
      })
  }

  return (
    <div>
      <Finder text={text} onChange={handleTextChange} />
      <CountryList countries={countries} onClick={handleShowCountry} />
    </div>
  )
}

export default App
