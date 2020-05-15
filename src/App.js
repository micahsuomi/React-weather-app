import React, { Component } from 'react';
import './App.css';
import CountryWeather from './components/CountryWeather';


// const APIKEY = `7490bafdbdf54db681e77344e32969b2`

const openKEY = '7c2f794ea06534fefdbd38ae67cdfd84'; 

     
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


class App extends Component {
  //class app is a child of rect.component
  constructor(props) {
    super(props)
    //super connects the child with the parent
    this.state = {
                  query: 'Helsinki',
                  isSingleCountryLoaded: false,
                  text: '',
                  weather: [],
                  name: '',
                  isUpdating: false,
                  }
            }

  // mounting https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22
  componentDidMount() {
    
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&appid=${openKEY}`
    fetch(openWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.name)
      let weatherArr = [];
      let {id, name} = data;
      let {speed, deg} = data.wind;
      let {country} = data.sys
      let {temp, feels_like, temp_min, temp_max, pressure, humidity} = data.main;
      console.log(id, name, country)
      let k = -273.15
      temp = Math.ceil(temp + k);
      feels_like = Math.ceil(feels_like + k);
      temp_min = Math.ceil(temp_min + k);
      temp_max = Math.ceil(temp_max + k);

      let weather = data.weather;
      let weatherDescription = '';
      for(const w of weather) {
        console.log(w)
        let {main} = w;
        weatherDescription = weatherDescription + main;
    
      }
    
      weatherArr.push({id, name, country, weatherDescription, temp, feels_like, temp_min, temp_max, pressure, humidity, speed, deg})
      this.setState({weather: weatherArr})
      console.log(this.state.weather)
    })

   
  }

 
 

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({isUpdating: true})
  
  }
 
  
  handleChange = (e) => {
    let {name, value} = e.target;
    this.setState({query: value})
    console.log(value, name)
  
  }

  

  // updating 
 
  componentDidUpdate() {

    if(this.state.query.length > 3 && this.state.isUpdating === true) {
          const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&appid=${openKEY}`
        fetch(openWeatherUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          
          let weatherArr = [];
          let {id, name} = data;
          let {speed, deg} = data.wind;
          let {country} = data.sys
          let {temp, feels_like, temp_min, temp_max, pressure, humidity} = data.main;
          let k = -273.15
          temp = Math.ceil(temp + k);
          feels_like = Math.ceil(feels_like + k);
          temp_min = Math.ceil(temp_min + k);
          temp_max = Math.ceil(temp_max + k);
            
          let weather = data.weather;
          let weatherDescription = '';
      for(const w of weather) {
        console.log(w)
        let {main} = w;
        weatherDescription = weatherDescription + main;
    
      }
    
      weatherArr.push({id, name, country, weatherDescription, temp, feels_like, temp_min, temp_max, pressure, humidity, speed, deg})
          this.setState({weather: weatherArr, isUpdating: false})
 

          }
          
        )
        
        }
        
      
    }

  
  render() {
  
       
    let weatherCountry = this.state.weather.map((country) => (
      
      <CountryWeather key = {country.id}
               name={country.name}
               country={country.country}
               description={country.weatherDescription}
               temperature={country.temp}
               feelsLike={country.feels_like}
               tempMin={country.temp_min}
               tempMax={country.temp_max}
               humidity={country.humidity}
               windSpeed={country.speed}
               windDeg={country.deg}



              />
    ))

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
    console.log(weatherIcons.cloudRain)

    //display data in the header
      let temperature = '';
      let feels = '';
      let description = '';
      let weatherIcon

      for(const weather of this.state.weather) {
        let {temp, feels_like, weatherDescription} = weather;
        temperature = temperature + temp;
        feels = feels + feels_like;
        description = description + weatherDescription;
        let index = 0;
        if(weatherDescription.includes('Clouds')) {
          console.log('it is cloudy')
            // index =+ 2
            //  backGroundStyles = backGroundStyles[index];
            weatherIcon = weatherIcons.cloudy
        } else if(weatherDescription.includes('Clear')) {
            weatherIcon = weatherIcons.sun
            // index = 0
            //  backGroundStyles = backGroundStyles[index];

        } else if(weatherDescription.includes('RainHaze') || 
        (weatherDescription.includes('Rain'))) {
            weatherIcon = weatherIcons.cloudRain

        } else {
            weatherIcon = weatherIcons.cloudRain

        }

      }

      return (
        <div className="wrapper">
           <div className="container">
              <div className="header">
                  <div className="header-top">
                  <i className="fas fa-temperature-low fa-2x title-icon"></i>
                  <h2 className="title">React Weather App</h2>
              </div>
              <form className="form" onSubmit={this.handleSubmit}>     
                  <input className="search-input" 
                      name={this.state.query} 
                      onChange={this.handleChange}
                      placeholder="Search weather by city" />           
                      <div className="buttons-wrapper">
                        <button className="search-btn">Search</button>
                     
                  </div>
              </form>
              <div className="weather-wrapper">
              <div className="weather-left">
              <i className={weatherIcon} style={{color: 'white'}}></i> 
                  <h4 className="header-city">City: {this.state.query}</h4>
                  <p className="header-description">{description}</p>
                  <h3 className="header-temperature">{temperature} C</h3>
                  <p className="header-feelsLike">Feels Like{feels} C</p>
              </div>
                
              <div className="countries-weather__wrapper">{weatherCountry}</div>
              
              </div>
              </div>
             
              </div>
       
        <footer>
          <p>Michele Zucca Web Dev</p>
        </footer>
        </div>
      )
    }
    
  }

     
  
export default App;
