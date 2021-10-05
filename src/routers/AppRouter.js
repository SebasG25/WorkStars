import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import roles from '../helpers/roles'
import routes from '../helpers/routes'
import '../App.css';

import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Account from '../components/Account';

import AdminUsers from '../components/AdminUsers';
import AdminProjects from '../components/AdminProjects';

import NotFoundPage from '../components/NotFoundPage';


function AppRouter() {

  return (
    <Router>
      <Navigation />
      <div className="p-4">

        <Switch>
          <PublicRoute path={routes.home} exact component={HomePage}></PublicRoute>

          <PublicRoute exact path={routes.signin} component={SignIn}></PublicRoute>
          <PublicRoute exact path={routes.signup} component={SignUp}></PublicRoute>
          <PrivateRoute exact path={routes.account} component={Account}></PrivateRoute>

          <PrivateRoute hasRole={roles.admin} exact path={routes.admin.users} component={AdminUsers}></PrivateRoute>
          <PrivateRoute hasRole={roles.admin} exact path={routes.admin.user()} component={AdminUsers}></PrivateRoute>
          <PrivateRoute hasRole={roles.admin} exact path={routes.admin.projects} component={AdminProjects}></PrivateRoute>

          <Route exact path="*" component={NotFoundPage}></Route>
        </Switch>
      </div>

    </Router>
  );
}

export default AppRouter;
