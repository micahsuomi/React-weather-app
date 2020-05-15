import React from 'react';
import './country.css';

const CountryWeather = (props) => {
    let {name, country, temperature, tempMin, tempMax, description, humidity, feelsLike, windSpeed, windDeg} = props;
        
    
    return (
        <div className="country-weather__container" >          
            <h4>Country: {country}</h4>
            <p>City: {name}</p>
            <p>Weather Description: {description}</p>
            <p>Temp: {temperature} C</p>
            <p>Min Temp: {tempMin} C</p>
            <p>Max: Temp {tempMax} C</p>
            <p>Humidity: {humidity}</p>
            <p>Feels Like: {feelsLike}</p>
            <p>Wind Speed: {windSpeed}</p>
            <p>Wind Deg: {windDeg}</p>

        </div>
    )
}

export default CountryWeather;