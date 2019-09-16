import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { firebase } from './firebaseConfig';

import Loading from './Loading';
import SignIn from './layouts/auths/SignIn';
import DashboardContainer from './layouts/admins/components/dashboards/DashboardContainer';
import OrdersContainer from './layouts/admins/components/orders/OrdersContainer';
import CreateContainer from './layouts/admins/components/creates/CreateContainer';
import ProfileContainer from './layouts/admins/components/profiles/ProfileContainer';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/auth/signin', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

export default class AppContainer extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <Loading /> : (
      <BrowserRouter>
        <Switch>
          <PublicRoute authed={this.state.authed} exact path='/auth/signin' component={SignIn} />
          <PrivateRoute authed={this.state.authed} exact path='/' component={DashboardContainer} />
          <PrivateRoute authed={this.state.authed} exact path='/orders' component={OrdersContainer} />
          <PrivateRoute authed={this.state.authed} exact path='/creates' component={CreateContainer} />
          <PrivateRoute authed={this.state.authed} exact path='/profiles' component={ProfileContainer} />
          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </BrowserRouter>
    );
  }
}


ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
