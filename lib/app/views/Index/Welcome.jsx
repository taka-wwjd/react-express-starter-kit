import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.js';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  fetchName() {
    axios.get('/name', {
      params: {
        apiKey: config.app.apiKey
      }
    }).then((response) => {
      this.setState({
        name: response.data.name
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  componentWillMount() {
    this.fetchName();
  }

  render() {
    return (
      <div className="home">
        <div className="name">
          <h1>Welcome to {this.state.name}</h1>
        </div>
        <p>Powered by Express React Starter</p>
      </div>
    );
  }
}

export default Welcome;