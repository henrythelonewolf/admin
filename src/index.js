import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import SignIn from './layouts/auths/SignIn';
import DashboardContainer from './layouts/admins/components/dashboards/DashboardContainer';
import OrdersContainer from './layouts/admins/components/orders/OrdersContainer';
import CreateContainer from './layouts/admins/components/creates/CreateContainer';
import ProfileContainer from './layouts/admins/components/profiles/ProfileContainer';

const AppContainer = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/auth/signin'} component={SignIn} />
      <Route exact path={'/'} component={DashboardContainer} />
      <Route exact path={'/orders'} component={OrdersContainer} />
      <Route exact path={'/creates'} component={CreateContainer} />
      <Route exact path={'/profiles'} component={ProfileContainer} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
