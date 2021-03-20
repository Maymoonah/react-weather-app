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
    <ul>
        <li>City: ${this.state.city}, ${this.state.country}</li>
        <li>Latitude: ${this.state.lat}</li>
        <li>Longitude: ${this.state.lon}</li>
        <li>Temperature: ${this.state.temperature}</li>
        <li>Feels Like: ${this.state.feelsLike}</li>
        <li>Maximum Temperature: ${this.state.maxTemp}</li>
        <li>Minimum Temperature: ${this.state.minTemp}</li>
        <li>Weather: ${this.state.weather}</li>
        <li>Weather Description: ${this.state.weatherDescription}</li>
        <li>Humidity: ${this.state.humidity}</li>
        <li>Wind Speed: ${this.state.wind} mph</li>
    </ul>`
  }  

  render () {
    return (
      <div className="App">
        <h1>Weather Application</h1>
        <input type="text" className="city"/>
        <button type="submit" onClick={this.getCity}>Get City</button>
        <div className="info"></div>
      </div> 
    );
  }
}

export default App;
