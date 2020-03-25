import React, { Component } from 'react';
import './App.css';
import CountryWeather from './components/CountryWeather';


// const APIKEY = `7490bafdbdf54db681e77344e32969b2`

const openKEY = '7c2f794ea06534fefdbd38ae67cdfd84'; 

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

   /*
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${APIKEY}&query=${this.state.query}`
    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let weatherArr = [];
      let name = data.location.name;
      let country = data.location.country;
      let description = data.current.weather_descriptions;
      let temperature = data.current.temperature;
      let humidity = data.current.humidity;
      let icon = data.current.weather_icons;
      let feelsLike = data.current.feelslike

      weatherArr.push({name, country, temperature, description, humidity, icon, feelsLike})
      this.setState({weather: weatherArr, isLoading: true })
      console.log(this.state.weather)
        
      
     
    })*/
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
 
  componentDidUpdate(prevState = this.state.query, currState) {
    let weatherArr = []
    console.log(this.state.query)
    if(this.state.query.length > 3 && this.state.isUpdating === true) {

          console.log('new query', this.state.query, prevState)
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
  
   
    let weatherCountry = this.state.weather.map((country, index) => (
      
      <CountryWeather key = {country.id}
               icon={country.icon}
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

    //display data in the header
      let temperature = '';
      let feels = '';
      let description = '';
      for(const weather of this.state.weather) {
        let {temp, feels_like, weatherDescription} = weather;
        temperature = temperature + temp;
        feels = feels + feels_like;
        description = description + weatherDescription;
      }

      return (
        <div className="wrapper">
           <div className="container">
              <div className="header">
                  <div className="header-top">
                  <h2 className="title">Weather App</h2>
                  <h4 className="header-city">{this.state.query}</h4>
                  <p className="header-description">{description}</p>
                  <h3 className="header-temperature">{temperature} C</h3>
                  <p className="header-feelsLike">Feels Like{feels} C</p>
              </div>
                  <form className="form" onSubmit={this.handleSubmit}>     
                  <input className="search-input" 
                      name={this.state.query} 
                      onChange={this.handleChange}
                      placeholder="Search weather by city" />           
                      <div className="buttons-wrapper">
                        <button className="name-btn">Search</button>
                     
                  </div>
              </form>
  
              </div>
       
         <div className="countries-weather__wrapper">{weatherCountry}</div>
              
          </div>
        </div>
      )
    }
    
  }

     
  
export default App;
