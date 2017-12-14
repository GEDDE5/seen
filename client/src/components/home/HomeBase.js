import React from 'react'

import Routes from './Routes'

import Container from './shared/Container'
import Banner from './shared/Banner'
import Nav from './shared/Nav'

const HomeBase = props => (
  <div className='HomeBase'>
    <Container>
      <Banner />
      <Nav />
      <Routes {...props} />
    </Container>
  </div>
)

export default HomeBase
