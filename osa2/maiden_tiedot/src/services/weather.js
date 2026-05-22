import axios from 'axios'
const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=7048ddb1124949d2bef203028262205&'

const getWeather= (city) => {
    const encodedCity = encodeURIComponent(city)
    return axios.get(`${baseUrl}q=${encodedCity}&aqi=no`)
    .then(response => response.data)

}

export default { getWeather }