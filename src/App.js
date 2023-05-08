import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Product from './pages/product/product';
import PembelianProduct from './pages/product/pembelian/pembelian-product';

function App() {
  return (
    // <div class="wrapper">
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/product" component={Product} />
      <Route
        exact
        path="/dashboard/product/pembelian"
        component={PembelianProduct}
      />
    </Switch>
    // </div>
  );
}

export default App;
