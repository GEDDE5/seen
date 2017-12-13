import React from 'react'

import Input from './shared/Input'

const New = props => (
  <div className='New'>
    <div className='page'>
      <p className='page-description'>
        Create new room
      </p>
    </div>
    <Input
      {...props}
      action='create'
    />
  </div>
)

export default New
