import React, { Component } from 'react';
import { Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      api_key: 'dbcb6d54de23ada0919e45a242572082',
      API: 'q7C352wRG59qS1UpqlAnoNPIhirf7pA4'
    };

    this.getCity = this.getCity.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.getKey = this.getKey.bind(this);
    this.accuweather = this.accuweather.bind(this);
  }

  getKey(city) {
    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.state.API}&q=${city}`)
    .then(response => { return response.json()})
    .then(data => { 
      this.setState({ cityKey: data[0].Key })
      this.accuweather();
    });
  }

  accuweather() {
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.cityKey}?apikey=${this.state.API}`)
    .then(response => { return response.json()})
    .then(data => console.log(data));
  }

  getCity(event) {
    event.preventDefault();
    let getCity = document.getElementsByClassName("city")[0].value;
    this.setState({ city: getCity });
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${getCity}&units=imperial&APPID=${this.state.api_key}`) 
    .then(response => { return response.json()})
    .then(data => {this.setState({
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
    })
    this.renderInfo();
    this.getKey(getCity);
    });
  }

  renderInfo() {
    document.getElementsByClassName("info")[0].innerHTML = `
    <Row>
      <Col md={8}>
        <ul className="weather">
          <li className="weatherInfo"><strong>City:</strong> <span className="details">${this.state.city}, ${this.state.country}</span></li>
          <li className="weatherInfo"><strong>Latitude:</strong> <span className="details">${this.state.lat}</span></li>
          <li className="weatherInfo"><strong>Longitude:</strong> <span className="details">${this.state.lon}</span></li>
          <li className="weatherInfo"><strong>Temperature:</strong> <span className="details"> ${this.state.temperature}</span></li>
          <li className="weatherInfo"><strong>Feels Like:</strong> <span className="details">${this.state.feelsLike}</span></li>
          <li className="weatherInfo"><strong>Maximum Temperature: </strong><span className="details">${this.state.maxTemp}</span></li>
          <li className="weatherInfo"><strong>Minimum Temperature: </strong><span className="details">${this.state.minTemp}</span></li>
          <li className="weatherInfo"><strong>Weather:</strong> <span className="details">${this.state.weather}</span></li>
          <li className="weatherInfo"><strong>Weather Description: </strong><span className="details">${this.state.weatherDescription}</span></li>
          <li className="weatherInfo"><strong>Humidity:</strong> <span className="details">${this.state.humidity}</li>
          <li className="weatherInfo"><strong>Wind Speed:</strong> <span className="details">${this.state.wind} mph</span></li>
        </ul>
      </Col>
      
    </Row>
    `
  } 

  // make api call if "enter" button is pressed
  onEnter() {
    let input = document.getElementsByClassName("city");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.getCity();
      }
    });
  }
 

  render () {
    return (
      <div className="App">
        <Container>
          <h1 id="title">Weather App</h1>
            <input type="text" placeholder="Enter city..." className="city"/>
            <br/>
            <button id="submit" type="submit" onClick={this.getCity}>Check Weather!</button>
          <div className="info"></div>
        </Container>
        
      </div> 
    );
  }
}

export default App;
