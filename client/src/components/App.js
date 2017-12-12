import React, { Component } from 'react'
import api from '../utils/api'

import Routes from './Routes'

import Loading from './shared/Loading/'

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      token: null,
      user: {}
    }
  }

  async componentWillMount() {
    this.initUser()
  }

  setUser = user =>
    this.setState({
      loading: false,
      token: user.token,
      user: user.data
    })

  initUser = async () => {
    let user = { token: localStorage.getItem('token') }
    if (user.token) {
      user.token = JSON.parse(user.token)
      user.data = await api(user.token).rails.users.ident()
      this.setUser(user)
    } else {
      user = await api().rails.users.create()
      if (user.errors) {
        console.error(user.errors)
      } else {
        localStorage.setItem('token', JSON.stringify(user.token))
        this.setUser(user)
      }
    }
  }

  token = {
    val: () => this.state.token,
    set: token => this.setState({ token })
  }

  render() {
    const {
      loading
    } = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <div className='App'>
        <Routes
          token={this.token}
        />
      </div>
    )
  }
}

export default App
