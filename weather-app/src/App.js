import React, { Component } from 'react';
import { Container, Card, CardGroup } from 'react-bootstrap/';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      api_key: 'dbcb6d54de23ada0919e45a242572082',
      API: 'q7C352wRG59qS1UpqlAnoNPIhirf7pA4',
      data: []
    };

    // bind this
    this.getCity = this.getCity.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.getKey = this.getKey.bind(this);
    this.nextFiveDays = this.nextFiveDays.bind(this);
    this.renderFiveDays = this.renderFiveDays.bind(this);

  }

  // get city key from accuweather
  getKey(city) {
    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.state.API}&q=${city}`)
    .then(response => { return response.json()})
    .then(data => { 
      this.setState({ cityKey: data[0].Key })
      this.nextFiveDays();
    });
  }

  // Get next forecase for next five days from accuweather using city key
  nextFiveDays() {
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.cityKey}?apikey=${this.state.API}`)
    .then(response => { return response.json()})
    .then(data => { 
      this.setState({ 
        nextFiveDays: Object.entries(data.DailyForecasts)
      }) 
      // this.renderFiveDays();
    });

  }

  // render next five day forecast to the 'fiveDays' div
  renderFiveDays() {
    let data = this.state.nextFiveDays;
    return ( 
      
      <CardGroup>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Day 1</Card.Title>
            <Card.Text>
              ${data[0][1].Date}, ${data[0][1].Day["IconPhrase"]}, ${data[0][1].Temperature.Maximum.Value}/${data[0][1].Temperature.Minimum.Value}
            </Card.Text>
          </Card.Body>
          
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Day 2</Card.Title>
            <Card.Text>
              ${data[1][1].Date}, ${data[1][1].Day["IconPhrase"]}, ${data[1][1].Temperature.Maximum.Value}/${data[1][1].Temperature.Minimum.Value}
            </Card.Text>
          </Card.Body>
          
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Day 3</Card.Title>
            <Card.Text>
              ${data[2][1].Date}, ${data[2][1].Day["IconPhrase"]}, ${data[2][1].Temperature.Maximum.Value}/${data[2][1].Temperature.Minimum.Value}
            </Card.Text>
          </Card.Body>
          
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Day 4</Card.Title>
            <Card.Text>
              ${data[3][1].Date}, ${data[3][1].Day["IconPhrase"]}, ${data[3][1].Temperature.Maximum.Value}/${data[3][1].Temperature.Minimum.Value}
            </Card.Text>
          </Card.Body>
          
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Day 5</Card.Title>
            <Card.Text>
              ${data[4][1].Date}, ${data[4][1].Day["IconPhrase"]}, ${data[4][1].Temperature.Maximum.Value}/${data[4][1].Temperature.Minimum.Value}
            </Card.Text>
          </Card.Body>
          
        </Card>
      </CardGroup>
    )   
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
    <Card className="bg-info text-white">
      <Card.Img src="holder.js/100px270" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Weather App</Card.Title></br>
        <Card.Text>
          <strong>City:</strong> <span className="details">${this.state.city}, ${this.state.country}</span></br>
          <strong>Latitude:</strong> <span className="details">${this.state.lat}</span></br>
          <strong>Longitude:</strong> <span className="details">${this.state.lon}</span></br>
          <strong>Temperature:</strong> <span className="details"> ${this.state.temperature}</span></br>
          <strong>Feels Like:</strong> <span className="details">${this.state.feelsLike}</span></br>
          <strong>Maximum Temperature: </strong><span className="details">${this.state.maxTemp}</span></br>
          <strong>Minimum Temperature: </strong><span className="details">${this.state.minTemp}</span></br>
          <strong>Weather:</strong> <span className="details">${this.state.weather}</span></br>
          <strong>Weather Description: </strong><span className="details">${this.state.weatherDescription}</span></br>
          <strong>Humidity:</strong> <span className="details">${this.state.humidity}</span></br>
          <strong>Wind Speed:</strong> <span className="details">${this.state.wind} mph</span></br>
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
    `
  }

  render () {
    let data;
    if(this.state.nextFiveDays) {
      data = this.renderFiveDays();
    }
    return (
      <div className="App">
        <Container>
          <h1 id="title">Weather App</h1>
            <input type="text" placeholder="Enter city..." className="city"/>
            <br/>
            <button id="submit" type="submit" onClick={this.getCity}>Check Weather!</button>
          <div className="info"></div>
          <div className="fiveDays">{data}</div>
        </Container>
      </div> 
    );
  }
}

export default App;
