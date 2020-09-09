import React, { FC } from 'react'
import { Route, Redirect } from 'react-router-dom'

interface PrivateRouteProps {
  component: any;
  isAuthenticated: boolean;
  exact: boolean;
  path: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => 
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to='/signin' />
      )
    }
  />

export default PrivateRoute
