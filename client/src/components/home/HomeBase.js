import React, { Component } from 'react'

import Routes from './Routes'

import Container from './shared/Container'
import Banner from './shared/Banner'
import Nav from './shared/Nav'

class HomeBase extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Banner />
        <Nav />
        <Routes {...this.props} />
      </Container>
    )
  }
}

export default HomeBase
