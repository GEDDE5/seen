import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../../utils/api'

import Input from './shared/Input'
import Errors from './shared/Errors'

import { Fade } from 'reactstrap'

class ActionPage extends Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  componentWillReceiveProps() {
    this.setState(() => this.initialState)
  }

  onKeyUp = input => {
    this.fadeOut()
    const { action } = this.props
    switch (action) {
      case 'create': {
        return this.createRoom(input)
      }
      case 'join':
        return this.joinRoom(input)
      default:
        break
    }
    return 'success'
  }

  get api() {
    return api(this.props.token)
  }

  fadeOut = () => this.setState({ errors: null, fadeIn: false })

  updateInput = attributes =>
    setTimeout(() => (
      this.setState({ ...attributes, fadeIn: true })
    ), 150)

  initialState = {
    errors: [],
    fadeIn: true,
    label: 'Name',
    placeholder: undefined,
    roomName: undefined,
    stepRequired: true
  }

  createRoom = async input => {
    const { stepRequired } = this.state
    if (stepRequired) {
      if (input.length <= 6) {
        this.updateInput({
          errors: ['Room name must be between 6 and 20 characters long']
        })
        return true
      }
      const room = await this.api.rails.rooms.create(input)
      if (room.errors) {
        // Room already exists
        this.updateInput({ errors: room.errors })
      } else {
        this.updateInput({
          label: 'Password',
          placeholder: 'Leave blank for passwordless room',
          roomName: input,
          stepRequired: false
        })
        return true
      }
    } else {
      const { roomName } = this.state
      const room = await this.api.rails.rooms.create(roomName, input)
      if (room.errors) {
        this.updateInput({ errors: room.errors })
      } else {
        this.props.joinRoom(room)
      }
    }
    return false
  }

  joinRoom = async input => {
    const { stepRequired } = this.state
    if (stepRequired) {
      if (input.length <= 6) {
        await this.updateInput({ errors: ['Room name must be between 6 and 20 characters long'] })
      }
      const room = await this.api.rails.rooms.auth(input)
      if (room.errors) {
        this.updateInput({ errors: room.errors })
      } else if (room.id) {
        // Public room
        this.props.joinRoom(room)
      } else {
        this.updateInput({
          label: 'Password',
          roomName: input,
          stepRequired: false
        })
      }
    } else {
      const { roomName } = this.state
      const room = await this.api.rails.rooms.auth(roomName, input)
      if (room.errors) {
        this.updateInput({ errors: room.errors })
      } else {
        this.props.joinRoom(room)
      }
    }
  }

  render() {
    const {
      description
    } = this.props

    const {
      errors,
      fadeIn,
      label,
      placeholder,
      stepRequired
    } = this.state

    return (
      <div className='ActionPage'>
        <div className='page'>
          <p className='page-description'>
            {description}
          </p>
        </div>
        <Fade
          in={fadeIn}
          appear={false}
          timeout={50}
        >
          <Input
            clearErrors={() => this.setState({ errors: null })}
            label={label}
            placeholder={placeholder}
            onKeyUp={this.onKeyUp}
            fadeOut={this.fadeOut}
            stepRequired={stepRequired}
          />
          <Errors errors={errors} />
        </Fade>
      </div>
    )
  }
}

ActionPage.propTypes = {
  action: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  joinRoom: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  token: PropTypes.string.isRequired
}

export default ActionPage
