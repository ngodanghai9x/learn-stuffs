// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
// } from "react-router-dom";
// import Admin from '../../pages/Admin';
// import User from '../../pages/User';
// import ProductList from '../../pages/Product/ProductList';
// import NotFound from '../../components/NotFound';

// export default function OldRouter() {
//   return (
//     <Switch>
//       <Route path="/admin" render={Admin} />
//       <Route path="/user" render={User} />
//       <Route path={["/users/:id", "/profile/:id"]} render={User} />
//       <Route path="/product-list" render={ProductList} />
//       <Route path="*" render={NotFound} />
//     </Switch>
//   );
// }