import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeBase from './home/HomeBase'
import RoomBase from './room/RoomBase'

const AppRoutes = props => (
  <Switch>
    <Route
      path='/rooms/:slug'
      render={routerProps => (
        <RoomBase
          {...routerProps}
          {...props}
        />
      )}
    />
    <Route
      path='/'
      render={routerProps => (
        <HomeBase
          {...routerProps}
          {...props}
        />
      )}
    />
  </Switch>
)

export default AppRoutes
