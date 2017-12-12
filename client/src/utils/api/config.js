import axios from 'axios'

const railsURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_RAILS_API_PRODUCTION
  : process.env.REACT_APP_RAILS_API_DEV

const expressURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_EXPRESS_API_PRODUCTION
  : process.env.REACT_APP_EXPRESS_API_DEV

const validateStatus = status => status >= 200 && status < 500

// eslint-disable-next-line arrow-body-style
const railsBase = (token = null) => axios.create({
  baseURL: railsURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Token ${token}` : 'Token '
  },
  validateStatus
})

const expressBase = axios.create({
  baseURL: expressURL,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus
})

export { railsBase, expressBase }
