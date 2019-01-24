import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.js';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // --------------------------------------------------
  // You can use this functions.
  // If you need an API connection to Express.
  // --------------------------------------------------
  // fetchData() {
  //   axios.get('/PATH_TO_EXPRESS', {
  //     params: {
  //       apiKey: config.app.apiKey
  //     }
  //   }).then((response) => {
  //     this.setState({
  //       data: response.data
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
  // 
  // componentWillMount() {
  //   this.fetchData();
  // }

  render() {
    return (
      <div>
        <p>NEW COMPONENT</p>
      </div>
    );
  }
}

export default Template;