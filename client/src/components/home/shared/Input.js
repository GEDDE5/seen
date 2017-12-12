import React, { Component } from 'react'

class Input extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='Input'>
        <input
          className='name'
          placeholder='Name'
          readOnly
        />
        <input className='action' />
        <input className='click'
          placeholder='&#9166;'
          readOnly
        />
      </div>
    )
  }
}

export default Input
