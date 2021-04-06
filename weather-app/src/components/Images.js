import React, { Component } from 'react';
import { Container, Card, CardGroup } from 'react-bootstrap/';


class Images extends Component {
  render() {
  	// let desc = this.props.descriptions;
  	let date = this.props.dates;
  	let data = this.props.data;
  	let imgUrl;

  	data.map(el=> { //data[0][1].Day["IconPhrase"]
				switch (el[1]) {
					case "Sunny":
					case "Clear":
						imgUrl = "./images/sunny.jpg";
						break;
					case "Mostly sunny":
					case "Partly sunny":
					case "Intermittent clouds":
					case "Mostly clear":
					case "Mostly cloudy":
					case "Partly cloudy":
					case "Partly cloudy w/ showers":
					case "Mostly cloudy w/ showers":
					case "Partly sunny w/ showers":
						imgUrl = "./images/partly_cloudy.jpg";
						break;
					case "Hazy":
					case "Hazy Moonlight":
					case "Cold":
						imgUrl = "./images/hazy.jpg";
						break;
					case "Fog":
					case "Cold":
						imgUrl = "./images/fog.jpg";
						break;
					case "Showers":
					case "Freezing rain":
						imgUrl = "./images/showers.jpg";
						break;
					case "Cloudy":
					case "Mostly cloudy w/ showers":
						imgUrl = "./images/cloudy.jpg";
						break;
					case "Dreary":
						imgUrl = "./images/dreary.jpg";
						break;
					case "T-storms":
					case "Partly cloudy w/ t-storms":
					case "Mostly cloudy w/ t-storms":
					case "Mostly cloudy w/ t-storms":
						imgUrl = "./images/storm.jpg";
						break;
					case "Rain":
						imgUrl = "./images/rainy.jpg";
						break;
					case "Flurries":
					case "Mostly cloudy w/ flurries":
					case "Mostly sunny w/ flurries":
					case "Rain and snow":
						imgUrl = "./images/flurries.jpg";
						break;
					case "Snow":
					case "Ice":
					case "Sleet":
					case "Mostly cloudy w/ snow":
						imgUrl = "./images/snow.jpg";
						break;
					case "Hot":
						imgUrl = "./images/hot.jpg";
						break;
					
					case "Windy":
						imgUrl = "./images/windy.jpg";
						break;
					}
				})

    return (
		<Container>
			{console.log(imgUrl)}
				<CardGroup>
			        <Card>
			          <Card.Img className ="weatherPhoto" variant="top" src={imgUrl} />
			          <Card.Body>
			            <Card.Title>{date[0]}</Card.Title>
			            <Card.Text>
			              {data[0][1].Day["IconPhrase"]}<br/>
			              High/Low: {data[0][1].Temperature.Maximum.Value}/{data[0][1].Temperature.Minimum.Value}
			            </Card.Text>
			          </Card.Body>
			          
			        </Card>
			        <Card>
			          <Card.Img className ="weatherPhoto" variant="top" src={imgUrl} />
			          <Card.Body>
			            <Card.Title>{date[1]}</Card.Title>
			            <Card.Text>
			              {data[1][1].Day["IconPhrase"]}<br/>
			              High/Low: {data[1][1].Temperature.Maximum.Value}/{data[1][1].Temperature.Minimum.Value}
			            </Card.Text>
			          </Card.Body>
			     
			        </Card>
			        <Card>
			          <Card.Img className ="weatherPhoto" variant="top" src={imgUrl} />
			          <Card.Body>
			            <Card.Title>{date[2]}</Card.Title>
			            <Card.Text>
			              {data[2][1].Day["IconPhrase"]}<br/>
			              High/Low: {data[2][1].Temperature.Maximum.Value}/{data[2][1].Temperature.Minimum.Value}
			            </Card.Text>
			          </Card.Body>
			          
			        </Card>
			        <Card>
			          <Card.Img className ="weatherPhoto" variant="top" src={imgUrl} />
			          <Card.Body>
			            <Card.Title>{date[3]}</Card.Title>
			            <Card.Text>
			              {data[3][1].Day["IconPhrase"]}<br/>
			              High/Low: {data[3][1].Temperature.Maximum.Value}/{data[3][1].Temperature.Minimum.Value}
			            </Card.Text>
			          </Card.Body>
			          
			        </Card>
			        <Card>
			          <Card.Img className ="weatherPhoto" variant="top" src={imgUrl} />
			          <Card.Body>
			            <Card.Title>{date[4]}</Card.Title>
			            <Card.Text>
			              {data[4][1].Day["IconPhrase"]}<br/>
			              High/Low: {data[4][1].Temperature.Maximum.Value}/{data[4][1].Temperature.Minimum.Value}
			            </Card.Text>
			          </Card.Body>
			        </Card>
			        
			      </CardGroup>
		</Container>
		)
	}
}

export default Images;