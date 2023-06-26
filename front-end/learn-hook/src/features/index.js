import React, { useState, useEffect } from 'react';
import {
  useRouteMatch,
  NavLink,
  Switch,
  Route,
} from 'react-router-dom';
import TestEffect from '../components/TestEffect';
import Count from '../components/Count';
import MyLazyLoad from './LazyLoad/LazyLoad';
import TestContext from './TestContext/TestContext';

function Features() {
  let { path, url } = useRouteMatch();

  return (
    <div className="Features">
      <h2>Features</h2>
      <ul>
        <button>
          <NavLink to={`${url}/lazyLoad`}>Demo lazyLoad</NavLink>
        </button>
        <button>
          <NavLink to={`${url}/testEffect`}>Demo testEffect</NavLink>
        </button>
        <button>
          <NavLink to={`${url}/count`}>Demo count</NavLink>
        </button>
        <button>
          <NavLink to={`${url}/testContext`}>Demo testContext</NavLink>
        </button>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a Features.</h3>
        </Route>
        <Route path={`${path}/lazyLoad`} component={MyLazyLoad} />
        <Route path={`${path}/testEffect`} component={TestEffect} />
        <Route path={`${path}/count`} component={Count} />
        <Route path={`${path}/testContext`} component={TestContext} />
      </Switch>
    </div>
  );
}

export default Features;
