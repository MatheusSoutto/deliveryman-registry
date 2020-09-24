import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Search from "./components/pages/Search";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/pages/NotFound";
import Add from "./components/deliverymen/Add";
import Edit from "./components/deliverymen/Edit";
import View from "./components/deliverymen/View";
import TakePhoto from "./components/common/TakePhoto";

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
