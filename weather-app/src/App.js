import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: "Los Angeles",
      data: []
    };
    
  }

  componentDidMount() {
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=Los%20Angeles&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html", {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "c617e14926msh1b32a202714298ap130120jsn5a3fce0740f8",
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
  }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
  }

  
  render () {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Hi</h1>
        </header>
      </div>
    );
    
  }
}

export default App;
