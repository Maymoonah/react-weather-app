import React, { Component } from 'react';
import ReactDOM from "react-dom"''

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 34.0522,
      lon: 118.2437,
      API_KEY: "a477dcbfc72c1c3cfb42a0aa6bacccbd"
    };
    // Binding method
    
  }

  componentWillMount() {
    let api_call = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${this.state.API_KEY}`;
    if(this.state.lat) {
      fetch(api_call)
    .then(response => response.json())
    .then(data => console.log(data));
    }
    
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
