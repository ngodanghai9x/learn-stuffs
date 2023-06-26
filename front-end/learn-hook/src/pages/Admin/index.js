// import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
  useHistory,
  useParams,
} from "react-router-dom";
import ManageProduct from './ManageProduct';
import ManageUser from './ManageUser';

function Admin() {
  // const [count, setCount] = useState(0);
  let location = useLocation();
  let history = useHistory();
  let params = useParams();
  console.log("🚀 ~ file: index.js ~ line 15 ~ Admin ~ location", { history, location, params })

  return (
    <div className="Admin">
      Admin
      <Router
        // basename="/ndh"
        // basename={`/ndh/${location.pathname}`}
        basename={`/ndh${history.location.pathname}`}
      >
        <ul>
          <li>
            <NavLink
              activeClassName="link-active"
              // to={`${location.pathname}/manage-product`}
              to="/manage-product"
            >
              ManageProduct
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="link-active"
              // to={`${location.pathname}/manage-user`}
              to="/manage-user"

            >
              ManageUser
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route
            // path="/admin/manage-product"
            path="/manage-product"
            component={ManageProduct}
          />
          <Route
            path="/manage-user"
            component={ManageUser}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Admin;
