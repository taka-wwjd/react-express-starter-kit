import React, { Component } from 'react';
import axios from 'axios';

import configApi from '../../config/api.js';

axios.defaults.headers.common['api-key'] = configApi.key;

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
  //   axios.get('/api/API_NAME').then((response) => {
  //     this.setState({
  //       data: response.data
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
  // 
  // componentDidMount() {
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