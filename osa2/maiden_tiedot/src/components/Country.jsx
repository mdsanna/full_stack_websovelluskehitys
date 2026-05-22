
const Country = ({country, weather}) => {
  
    const WeatherInformation = ({city, weather}) => {

        if (weather) {
                const current = weather.current
                return (
                <>
                <h2>Weather in {city}</h2>
                <p>Temperature: {current.temp_c}</p>
                <img src={current.condition.icon} alt={`Current condition: ${current.condition.text}`} />
                <p>Wind: {current.wind_dir} {current.wind_mph} </p>
                </>
                )
            }

        return (
            <>
            <h2>Weather in {city}</h2>
            <p>No weather information</p>
            </>
        )
    }
    
        
    if (country) {

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h2>Languages</h2>
            <ul>
            {Object.values(country.languages).map(lang => (
                <li key={lang}>{lang}</li>
            ))}
            </ul>
  
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        
            <WeatherInformation 
                city={country.capital}
                weather={weather}
                />


        </div>
        )
    }
}

export default Country