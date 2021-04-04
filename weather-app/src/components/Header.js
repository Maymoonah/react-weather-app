import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faCloudSunRain } from '@fortawesome/free-solid-svg-icons';
import { Button} from 'react-bootstrap/';

class Header extends Component {
  render() {
    return (
		<div className="header">
			<h1 id="title"><FontAwesomeIcon icon={faCloudSunRain} /> What's The Weather Like <FontAwesomeIcon icon={faQuestion} /></h1>
			<input type="text" placeholder="Enter city..." className="city"/>
			<br/>
			<Button id="submit" onClick={this.props.getCity}>Check Weather!</Button>
		</div>
		)
	}
}

export default Header;