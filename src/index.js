import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { firebase } from './firebaseConfig';
import store from './store';

import SignIn from './layouts/auths/SignIn';
import DashboardContainer from './layouts/admins/components/dashboards/DashboardContainer';
import OrdersContainer from './layouts/admins/components/orders/OrdersContainer';
import CreateContainer from './layouts/admins/components/creates/CreateContainer';
import ProfileContainer from './layouts/admins/components/profiles/ProfileContainer';

const AppContainer = () => (
  <Router>
    <Route exact path={'/auth/signin'} component={SignIn} />
    <PrivateRoute exact path={'/'} component={DashboardContainer} />
    <PrivateRoute exact path={'/orders'} component={OrdersContainer} />
    <PrivateRoute exact path={'/creates'} component={CreateContainer} />
    <PrivateRoute exact path={'/profiles'} component={ProfileContainer} />
  </Router>
)

function PrivateRoute({ component: Component, ...rest }){
  return (
    <Route
      {...rest}
      render={ props => firebase.auth().currentUser || store.currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
        to={{
          pathname: '/auth/signin',
          state: { from: props.location }
        }}
        />
      )}
    />
  )
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
