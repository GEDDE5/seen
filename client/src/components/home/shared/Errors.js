import React from 'react'
import PropTypes from 'prop-types'

const Errors = ({ errors }) => (
  <div className='errors'>
    {errors &&
      <div>
        {errors.map((error, index) => (
            { id: index, message: error }
          )).map(error => (
            <p key={error.id}>{error.message}</p>
        ))}
      </div>
    }
  </div>
)

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
}

Errors.defaultProps = {
  errors: []
}

export default Errors
