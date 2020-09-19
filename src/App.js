import dotenv from "dotenv";
import axios from "axios";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/pages/NotFound";
import Add from "./components/deliverymen/Add";
import Edit from "./components/deliverymen/Edit";
import View from "./components/deliverymen/View";

dotenv.config();

const login = async () => {
    return await axios({
    method: 'post',
    url: process.env.API_URL + '/auth/authenticate',
    data: { login: process.env.API_USER, password: process.env.API_PASSWORD },
    headers: {
      'content-type': 'application/json'
    }
  });
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('auth') ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }
  />
);

class App extends Component {

  constructor() {
    super();

    if (!localStorage.getItem('auth')) {
      login().then(result => {
        if (result && result.token && result.token.length > 0) {
          localStorage.setItem('auth', result);
          console.log(localStorage.getItem('auth'));
          // Retrieve the last state
          this.state = localStorage.getItem('auth') ? localStorage.getItem('auth') : undefined;
        }
      })
        .catch(err => {
          console.log(err);
        });
    }


  }

  componentWillUnmount() {
    // Remember state for the next mount
    localStorage.setItem('auth', this.state);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/search" component={Search} />
            <PrivateRoute exact path="/about" component={About} />
            <PrivateRoute exact path="/deliverymen/add" component={Add} />
            <PrivateRoute exact path="/deliverymen/edit/:id" component={Edit} />
            <PrivateRoute exact path="/deliverymen/:id" component={View} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  };
}

export default App;
