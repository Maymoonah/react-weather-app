import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: "London",
      data: [],
      api_key: 'dbcb6d54de23ada0919e45a242572082'
    };
    
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${this.state.api_key}`) 
  .then(response => response.json())
  .then(data => { console.log(data) });
  }

  
  render () {
    return (
      <div className="App">
      </div>
    );
    
  }
}

export default App;
