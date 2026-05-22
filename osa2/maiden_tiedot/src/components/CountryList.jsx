import Country from './Country'

const CountryList = ({countries, onClick}) => {

    //Too many matches
    if (countries.length>10) {
        return (
            <div>
               Too many mathches, specify another filter
            </div>        
        )
    }

    //Show country list
    if (countries.length>1) {
        return (
            <ul>
            {countries.map(country => (
                <li key={country.name.common}>
                    {country.name.common}
                <button onClick={() => onClick(country.name.common)}>Show</button>
                </li> 
            ))}
            </ul>  
        )   
    }

    //Only one country ->show country details
    if (countries.length===1){
        return (
            <>
                <Country country={countries[0]}/>
            </>
        )

}
}

export default CountryList