import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      lat: 34.0522,
      lon: 118.2437,
      API_KEY: "a477dcbfc72c1c3cfb42a0aa6bacccbd",
      data: []
    };
    
  }

  getAPI() {
    let api_call = '';
    
    if(typeof this.props.count !== 'undefined') {
      api_call = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=a477dcbfc72c1c3cfb42a0aa6bacccbd`;
    }

    fetch(api_call)
    .then(response => response.json())
    .then(data => this.setState({ data: data, isLoading: false }));
  }

  componentWillMount() {
    this.getAPI();
  }

  render () {
    console.log(this.state.data);
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
