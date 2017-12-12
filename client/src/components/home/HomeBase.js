import React, { Component } from 'react'

import Routes from './Routes'

class HomeBase extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='HomeBase'>
        <Routes {...this.props} />
      </div>
    )
  }
}

export default HomeBase
