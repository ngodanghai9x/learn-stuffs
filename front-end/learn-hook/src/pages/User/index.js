import React, { useState, useEffect } from 'react';
import {
  useRouteMatch,
  NavLink,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';

function User() {
  // const [count, setCount] = useState(0);
  let { path, url } = useRouteMatch();
  // path = `ndh/${path}`;
  // url = `ndh/${url}`;

  console.log("🚀 ~ file: index.js ~ line 13 ~ User ~ { path, url }", { path, url })

  return (
    <div className="User">
      <h2>User</h2>
      <ul>
        <li>
          <NavLink to={`${url}/user-detail`}>Detail</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/user-list`}>List</NavLink>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a user.</h3>
        </Route>
        <Route path={`${path}/:userType`} component={UserType} />
      </Switch>
    </div>
  );
}
const UserType = (props) => {
  let { userType } = useParams();
  return (
    <h2>{userType}</h2>
  );
}
export default User;
