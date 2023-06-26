import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

export default function Menu() {
  return (
    <div className="Menu" style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button>
        <NavLink activeClassName="link-active" to="/admin">admin</NavLink>
      </button>
      <button>
        <NavLink activeClassName="link-active" to="/user">user</NavLink>
      </button>
      <button>
        <NavLink activeClassName="link-active" to="/features">features</NavLink>
      </button>

      <button>
        <NavLink activeClassName="link-active" to={`/users/1`}>users-profile</NavLink>
      </button>
      <button>
        <NavLink activeClassName="link-active" to={`/profile/12`}>profile</NavLink>
      </button>
      <button>
        <NavLink activeClassName="link-active" to="/toRedirect">to redirect</NavLink>
      </button>
    </div>
  );
}