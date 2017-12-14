import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Room from './Room'

class RoomBase extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      room
    } = this.props

    return (
      <div className='RoomBase'>
        <Room room={room} />
      </div>
    )
  }
}

RoomBase.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    private: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired
  }).isRequired
}

export default RoomBase
