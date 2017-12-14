import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ children }) => (
  <div className='Container'>
    <div className='d-none d-md-block top-spacer' />
    <div className='col-sm-12 col-md-8 col-lg-4 home-container'>
      {children}
    </div>
  </div>
)

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container
