import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { firebase } from './firebaseConfig';

// components import
import Loading from './Loading';
import SignIn from './components/auths/SignIn';
import ForgotPassword from './components/auths/ForgotPassword';
// import DashboardContainer from './components/dashboards/DashboardIndex';
import OrdersContainer from './components/orders/OrdersIndex';
import CreateContainer from './components/creates/CreateIndex';
import ProfileContainer from './components/profiles/ProfileIndex';
// import CalendarContainer from './components/calendars/CalendarIndex';
import CompanyContainer from './components/companies/CompanyIndex';
import ProductContainer from './components/products/ProductIndex';
import AssigneeContainer from './components/assignees/AssigneeIndex';

export default function AppContainer(){
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  const PrivateRoute = ({component: Component, authed, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/auth/signin', state: {from: props.location}}} />}
      />
    )
  }

  const PublicRoute = ({component: Component, authed, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => authed === false
          ? <Component {...props} />
          : <Redirect to='/' />}
      />
    )
  }

  const checkLoggedIn = async () => {
    setLoading(true);
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthed(true);
        setLoading(false);
      } else {
        setAuthed(false);
        setLoading(false);
      }
    })
  }

  useEffect( () => {
    checkLoggedIn();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute authed={authed} exact path='/auth/signin' component={SignIn} />
          <PublicRoute authed={authed} exact path='/auth/forgotPassword' component={ForgotPassword} />

          <PrivateRoute authed={authed} exact path='/' component={OrdersContainer} />
          <PrivateRoute authed={authed} exact path='/orders' component={OrdersContainer} />
          <PrivateRoute authed={authed} exact path='/creates' component={CreateContainer} />
          <PrivateRoute authed={authed} exact path='/profiles' component={ProfileContainer} />
          {/* <PrivateRoute authed={authed} exact path='/calendars' component={CalendarContainer} /> */}

          <PrivateRoute authed={authed} exact path='/companies' component={CompanyContainer} />
          <PrivateRoute authed={authed} exact path='/products' component={ProductContainer} />
          <PrivateRoute authed={authed} exact path='/assignees' component={AssigneeContainer} />

          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </BrowserRouter>
    )
  }
}
