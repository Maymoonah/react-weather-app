import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: "Los Angeles",
      country: "",
      lat: "",
      lon: "",
      temperature: "",
      feelsLike: "",
      maxTemp: "",
      minTemp: "",
      weather: "",
      weatherDescription: "",
      wind: "", 
      humidity: "",
      api_key: 'dbcb6d54de23ada0919e45a242572082'
    };

    this.getCity = this.getCity.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }

  getCity() {
    let getCity = document.getElementsByClassName("city")[0].value;
    this.setState({ city: getCity });
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${this.state.api_key}`) 
    .then(response => response.json())
    .then(data => this.setState({
      city: data.name,
      country: data.sys.country,
      lat: data.coord.lat,
      lon: data.coord.lon,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      maxTemp: data.main.temp_max,
      minTemp: data.main.temp_min,
      weather: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      wind: data.wind.speed, 
      humidity: data.main.humidity
    }));
    if(typeof this.state.country !== undefined) {
      this.renderInfo();
    }
  }

  renderInfo() {
    document.getElementsByClassName("info")[0].innerHTML = `
    <ul className="weather">
        <li className="weatherInfo">City: ${this.state.city}, ${this.state.country}</li>
        <li className="weatherInfo">Latitude: ${this.state.lat}</li>
        <li className="weatherInfo">Longitude: ${this.state.lon}</li>
        <li className="weatherInfo">Temperature: ${this.state.temperature}</li>
        <li className="weatherInfo">Feels Like: ${this.state.feelsLike}</li>
        <li className="weatherInfo">Maximum Temperature: ${this.state.maxTemp}</li>
        <li className="weatherInfo">Minimum Temperature: ${this.state.minTemp}</li>
        <li className="weatherInfo">Weather: ${this.state.weather}</li>
        <li className="weatherInfo">Weather Description: ${this.state.weatherDescription}</li>
        <li className="weatherInfo">Humidity: ${this.state.humidity}</li>
        <li className="weatherInfo">Wind Speed: ${this.state.wind} mph</li>
    </ul>`
  }  

  render () {
    return (
      <div className="App">
        <h1 id="title">Weather App</h1>
        <input type="text" placeholder="Enter city..." className="city"/>
        <button id="submit" type="submit" onClick={this.getCity}>Check Weather!</button>
        <div className="info"></div>
      </div> 
    );
  }
}

export default App;
