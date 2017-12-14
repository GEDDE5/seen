import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

import { withRouter } from 'react-router-dom'
import Routes from './Routes'

import Loading from './shared/Loading/'

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      token: null,
      room: {},
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

  joinRoom = room => {
    this.setState({ room })
    this.props.history.push(`/rooms/${room.slug}`)
  }

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

  render() {
    const {
      loading,
      room,
      user
    } = this.state

    if (loading) {
      return <Loading />
    }

    const { token } = this.state
    return (
      <div className='App'>
        <div className='container'>
          <Routes
            joinRoom={this.joinRoom}
            token={token}
            room={room}
            user={user}
          />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(App)
