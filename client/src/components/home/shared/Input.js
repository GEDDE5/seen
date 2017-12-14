import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  handleKeyUp = async event => {
    const input = event.target.value.trim().toLowerCase()
    if (event.key === 'Enter') {
      this.props.onKeyUp(input)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.input.value = nextProps.stepRequired ? this.input.value : ''
  }

  // eslint-disable-next-line no-return-assign
  clear = () => this.input.value = ''

  render() {
    const {
      label,
      placeholder
    } = this.props

    return (
      <div className='Input'>
        <input
          className='name'
          placeholder={label}
          readOnly
        />
        <input
          // eslint-disable-next-line no-return-assign
          ref={r => this.input = r}
          className='action'
          onKeyUp={this.handleKeyUp}
          placeholder={placeholder}
        />
        <input
          className='click'
          placeholder='&#9166;'
          readOnly
        />
      </div>
    )
  }
}

Input.propTypes = {
  stepRequired: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onKeyUp: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

Input.defaultProps = {
  label: 'Name',
  placeholder: null
}

export default Input
