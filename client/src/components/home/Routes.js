import React from 'react'
import { Route, Switch } from 'react-router-dom'

import New from './_New'
import Join from './_Join'
import What from './_What'

const AppRoutes = props => (
  <Switch>
    <Route
      exact
      path='/'
      render={routerProps => (
        <New
          {...routerProps}
          {...props}
        />
      )}
    />
    <Route
      exact
      path='/join'
      render={routerProps => (
        <Join
          {...routerProps}
          {...props}
        />
      )}
    />
    <Route
      exact
      path='/what'
      render={routerProps => (
        <What
          {...routerProps}
        />
      )}
    />
  </Switch>
)

export default AppRoutes
