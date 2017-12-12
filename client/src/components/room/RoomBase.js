import React, { Component } from 'react'

import Room from './Room'

class RoomBase extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='RoomBase'>
        <Room />
      </div>
    )
  }
}

export default RoomBase
