import React, { Component } from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
  } from 'react-router-dom';
import { firebase } from './firebaseConfig';

// components import
import Loading from './Loading';
import SignIn from './layouts/auths/SignIn';
import ForgotPassword from './layouts/auths/ForgotPassword';
// import DashboardContainer from './layouts/admins/components/dashboards/DashboardIndex';
import OrdersContainer from './layouts/admins/components/orders/OrdersIndex';
import CreateContainer from './layouts/admins/components/creates/CreateIndex';
import ProfileContainer from './layouts/admins/components/profiles/ProfileIndex';
// import CalendarContainer from './layouts/admins/components/calendars/CalendarIndex';
import CompanyContainer from './layouts/admins/components/companies/CompanyIndex';
import ProductContainer from './layouts/admins/components/products/ProductIndex';
import AssigneeContainer from './layouts/admins/components/assignees/AssigneeIndex';

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
          <PublicRoute authed={this.state.authed} exact path='/auth/forgotPassword' component={ForgotPassword} />

          <PrivateRoute authed={this.state.authed} exact path='/' component={OrdersContainer} />
          <PrivateRoute authed={this.state.authed} exact path='/orders' component={OrdersContainer} />
          <PrivateRoute authed={this.state.authed} exact path='/creates' component={CreateContainer} />
          <PrivateRoute authed={this.state.authed} exact path='/profiles' component={ProfileContainer} />
          {/* <PrivateRoute authed={this.state.authed} exact path='/calendars' component={CalendarContainer} /> */}

          <PrivateRoute authed={this.state.authed} exact path='/companies' component={CompanyContainer} />
          <PrivateRoute authed={this.state.authed} exact path='/products' component={ProductContainer} />
          <PrivateRoute authed={this.state.authed} exact path='/assignees' component={AssigneeContainer} />

          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </BrowserRouter>
    );
  }
}