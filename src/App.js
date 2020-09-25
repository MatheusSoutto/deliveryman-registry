import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Search from "./client/pages/Search";
import About from "./client/pages/About";
import Navbar from "./client/layout/Navbar";
import NotFound from "./client/pages/NotFound";
import Add from "./client/deliverymen/Add";
import Edit from "./client/deliverymen/Edit";
import View from "./client/deliverymen/View";
import TakePhoto from "./client/common/TakePhoto";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
          <NotFound  />
        )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <PrivateRoute exact path="/" component={Search} />
            {/*<PrivateRoute exact path="/search" component={Search} />*/}
            <PrivateRoute exact path="/about" component={About} />
            <PrivateRoute exact path="/deliverymen" component={Add} />
            <PrivateRoute exact path="/deliverymen/edit/:id" component={Edit} />
            <PrivateRoute exact path="/deliverymen/:id" component={View} />
            <PrivateRoute exact path="/photo" component={TakePhoto} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  };
}

export default App;
