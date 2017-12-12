// eslint-disable-next-line no-unused-vars
import React from 'react'

const Container = props => (
  <div className='Container'>
    <div className='d-none d-md-block top-spacer' />
    <div className='col-sm-12 col-md-8 col-lg-4 home-container'>
      {props.children}
    </div>
  </div>
)

export default Container
