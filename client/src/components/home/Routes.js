import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ActionPage from './_ActionPage'
import What from './_What'

const AppRoutes = props => (
  <Switch>
    <Route
      exact
      path='/'
      render={routerProps => (
        <ActionPage
          action='create'
          description='Create new room'
          {...routerProps}
          {...props}
        />
      )}
    />
    <Route
      exact
      path='/join'
      render={routerProps => (
        <ActionPage
          action='join'
          description='Join existing room'
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
