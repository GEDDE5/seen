import { railsBase, expressBase as express } from './config'

const api = token => {
  const rails = token ? railsBase(token) : railsBase()
  return {
    rails: {
      users: {
        create: () =>
          rails.post('users').then(res => res.data),
        ident: () =>
          rails.get('users/ident').then(res => res.data)
      },
      rooms: {
        create: (name, password) => {
          const room = {
            room: {
              name,
              password
            }
          }
          return rails.post('rooms', room).then(res => res.data)
        },
        auth: (name, password) => {
          const room = {
            room: {
              name,
              password
            }
          }
          return rails.post('rooms/auth', room).then(res => res.data)
        },
        join: slug =>
          rails.get(`rooms/${slug}`).then(res => res.data)
      }
    },
    express: {
      supportingContent: content =>
        express.post('content-support', content)
    }
  }
}

export default api
