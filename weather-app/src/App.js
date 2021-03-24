import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: "",
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
    });
  }

  renderInfo() {
    document.getElementsByClassName("info")[0].innerHTML = `
    <Row>
      <Col md={8}>
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
      </ul>
      </Col>
      <Col md={4}>
        <img src="https://lh3.googleusercontent.com/proxy/9kCQZp8Tkij0TRogDfJ8Ac3T3Dtwa3voCsA_IAO2Ju7qbz38P2h2Qyv4ArTnCR3g6aB_o-fJquXsddHaCURAkKdgACsRqmVhfhN4fNNj-Nx6z1fq-kU6oQn7Bw2aikmZ1K8zhIbBu9haEdtW" alt="Partly Cloudy"/>
      </Col>
    </Row>
    `
  }  

  render () {
    return (
      <div className="App">
        <Container>
          <h1 id="title">Weather App</h1>
            <input type="text" placeholder="Enter city..." className="city"/>
            <br/>
            <button id="submit" type="submit" onClick={this.getCity}>Check Weather!</button>
          <div className="info">

          </div>
        </Container>
      </div> 
    );
  }
}

export default App;
