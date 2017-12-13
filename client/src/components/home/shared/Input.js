import React, { Component } from 'react'

import api from '../../../utils/api'

class Input extends Component {
  constructor(props) {
    super(props)

    this.token = this.props.token.val()
    this.api = api(this.token)

    this.state = {
      roomName: null,
      stepRequired: true
    }
  }

  onKeyUp = event => {
    const { action } = this.props
    const input = event.target.value.trim().toLowerCase()
    if (event.key === 'Enter' && (input || action === 'create')) {
      const { stepRequired } = this.state
      switch (action) {
        case 'create':
          if (stepRequired) {
            const room = this.verifyRoomName(input, action)
            if(room.errors) {

            }
          }
          break
        default:
          break
      }
    }
  }

  verifyRoomName = async (roomName, action) => {
    return await this.api.rails.rooms.findBy('name', roomName)
  }

  render() {
    return (
      <div className='Input'>
        <input
          className='name'
          placeholder='Name'
          readOnly
        />
        <input
          className='action'
          onKeyUp={this.onKeyUp}
        />
        <input
          className='click'
          placeholder='&#9166;'
          readOnly
        />
      </div>
    )
  }
}

export default Input
