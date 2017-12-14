import React, { Component } from 'react'

class Room extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='Room'>
        <p>{this.props.room.name}</p>
      </div>
    )
  }
}

export default Room
