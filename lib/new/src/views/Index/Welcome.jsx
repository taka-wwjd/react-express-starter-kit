import React, { Component } from 'react'
import axios from 'axios'

import appConfig from '../../../app.config.js'

axios.defaults.headers.common['api-key'] = appConfig.apiKey

class Welcome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  fetchName = () => {
    axios.get('/api/name').then((response) => {
      this.setState({
        name: response.data.name
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount = () => {
    this.fetchName()
  }

  render () {
    return (
      <div className='home'>
        <div className='name'>
          <h1>Welcome to {this.state.name}</h1>
        </div>
        <p>Powered by React Express Starter Kit</p>
      </div>
    )
  }
}

export default Welcome
