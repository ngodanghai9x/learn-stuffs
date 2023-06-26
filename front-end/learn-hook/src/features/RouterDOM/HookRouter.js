import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Admin from '../../pages/Admin';
import User from '../../pages/User';
import ProductList from '../../pages/Product/ProductList';
import NotFound from '../../components/NotFound';
import Features from '../index';
// import Features from 'features/index';

export default function HookRouter() {
  return (
    <Switch>
      <Route path="/admin" render={({ ...routerStore }) => <Admin routerStore={routerStore} />} />
      <Route path="/user" component={User} />
      <Route path="/features" render={() => <Features />} />
      <Route path="/toRedirect">
        <Redirect to="/features" />
      </Route>
      <Route exact path={["/test/:id", "/profile/:id"]} component={() => <h1>{`["/test/:id", "/profile/:id"]`}</h1>} />

      <Route path="*" component={NotFound} />
    </Switch>
  );
}