import React from 'react';
import './country.css';

const CountryWeather = (props) => {
    let {name, country, temperature, tempMin, tempMax, description, humidity, feelsLike, windSpeed, windDeg} = props;
        
    let weatherIcons = {
        sun: 'fas fa-sun fa-4x',
        cloudNight: 'fas fa-cloud-moon fa-4x',
        cloudRain: 'fas fa-cloud-rain fa-4x',
        rain: 'fas fa-cloud-showers-heavy fa-4x',
        partlyCloudy: 'fas fa-cloud-sun fa-4x',
        cloudy: 'fas fa-cloud fa-4x',
        fog: 'fas fa-fog fa-4x',
        snow: 'fas fa-snowflake fa-4x'
  
  }

  let backGroundStyles = [
      {
          backgroundColor: 'skyblue'
      },
      {
        backgroundColor: 'orange'
    },
    {
        backgroundColor: 'grey'
    },
  ]
        let index = 0;
        if(description.includes('Clouds')) {
            index =+ 2
             backGroundStyles = backGroundStyles[index];
             console.log(backGroundStyles)
            weatherIcons = weatherIcons.cloudy
        } else if(description.includes('Clear')) {
            weatherIcons = weatherIcons.sun
            index = 0
             backGroundStyles = backGroundStyles[index];

        } else if(description.includes('RainHaze')) {
            weatherIcons = weatherIcons.cloudRain

        }else {
            console.log(description)
        }
    return (
        <div className="country-weather__container" style={backGroundStyles}>          
            <i className={weatherIcons}></i>
            <h4>Country: {country}</h4>
            <p>City: {name}</p>
            <p>Weather Description: {description}</p>
            <p>Temperature: {temperature} C</p>
            <p>Temperature: {temperature} C</p>
            <p>Temperature Min: {tempMin} C</p>
            <p>Temperature Max: {tempMax} C</p>
            <p>Humidity: {humidity}</p>
            <p>Feels Like: {feelsLike}</p>
            <p>Wind Speed: {windSpeed}</p>
            <p>Wind Deg: {windDeg}</p>

        </div>
    )
}

export default CountryWeather;