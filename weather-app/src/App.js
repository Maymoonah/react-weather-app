import React, { Component } from 'react';
import { Container, Card, CardGroup } from 'react-bootstrap/';
import WeatherDescription from "./components/WeatherDescription";
import Header from "./components/Header";
import Images from "./components/Images";

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
      this.satelliteImagery();
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
    });
  }

  // Get satellite imagery for city entered
  satelliteImagery() {
    fetch(`http://dataservice.accuweather.com/imagery/v1/maps/radsat/{640x480}/${this.state.cityKey}?apikey=${this.state.API}`)
    .then(response => { return response.json()})
    .then(data => { 
      this.setState({ satelliteImagery: Object.entries(data) })
    });
    if(this.state.satelliteImagery) {
      console.log(this.state.satelliteImagery)
    }
  }

  // render next five day forecast to the 'fiveDays' div
  renderFiveDays() {
    let data = this.state.nextFiveDays;
    let date1 = data[0][1].Date.substring(0, 10);
    let date2 = data[1][1].Date.substring(0, 10);
    let date3 = data[2][1].Date.substring(0, 10);
    let date4 = data[3][1].Date.substring(0, 10);
    let date5 = data[4][1].Date.substring(0, 10);

    let desc1 = data[0][1].Day["IconPhrase"];
    let desc2 = data[1][1].Day["IconPhrase"];
    let desc3 = data[2][1].Day["IconPhrase"];
    let desc4 = data[3][1].Day["IconPhrase"];
    let desc5 = data[4][1].Day["IconPhrase"];

    let dates = [date1, date2, date3,date4, date5];
    let descriptions = [desc1, desc2, desc3, desc4, desc5];
       
    return ( 
      <Images data={data} descriptions={descriptions} dates={dates}/>
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
    if(typeof this.state.city !== "undefined") {
      this.renderInfo();
      this.getKey(getCity);
    }
    });
  }

  renderInfo() {
    return(
      <div>
        <Card className="text-white">
          <Card.Img src="images/sky.jpg" alt="Card image" className="sky"/>
          <Card.ImgOverlay>
            <Card.Text>
              <strong>City:</strong> <span className="details">{this.state.city}, {this.state.country}</span><br/>
              <strong>Latitude:</strong> <span className="details">{this.state.lat}</span><br/>
              <strong>Longitude:</strong> <span className="details">{this.state.lon}</span><br/>
              <strong>Temperature:</strong> <span className="details"> {this.state.temperature}</span><br/>
              <strong>Feels Like:</strong> <span className="details">{this.state.feelsLike}</span><br/>
              <strong>Maximum Temperature: </strong><span className="details">{this.state.maxTemp}</span><br/>
              <strong>Minimum Temperature: </strong><span className="details">{this.state.minTemp}</span><br/>
              <strong>Weather:</strong> <span className="details">{this.state.weather}</span><br/>
              <strong>Weather Description: </strong><span className="details">{this.state.weatherDescription}</span><br/>
              <strong>Humidity:</strong> <span className="details">{this.state.humidity}</span><br/>
              <strong>Wind Speed:</strong> <span className="details">{this.state.wind} mph</span><br/>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </div>
    )
  }

  render () {
    let fiveDays, weatherInfo, nextFiveDays, satelliteImagery;
    if(this.state.nextFiveDays) {
      fiveDays = this.renderFiveDays();
    }
    if(this.state.city) {
      weatherInfo = this.renderInfo();
    }
    if(this.state.nextFiveDays) {
      nextFiveDays = this.state.nextFiveDays;
    }
    if(this.state.satelliteImagery) {
      satelliteImagery = this.satelliteImagery();
    }
    return (
      <div className="App">
        <Container fluid>
          <Header getCity={this.getCity} />
          <WeatherDescription fiveDayForecast={nextFiveDays}/>
          <div className="info">{weatherInfo}</div>
          <div className="fiveDays"><CardGroup>{fiveDays}</CardGroup></div>
          <div>{this.satelliteImagery}</div>
        </Container>
      </div> 
    );
  }
}

export default App;
