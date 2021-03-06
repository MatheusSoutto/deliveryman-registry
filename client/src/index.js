import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Api from './config';
import App from './App';

const register = async () => {
  return await axios({
    method: 'post',
    url: Api.endpoint + '/auth/register',
    data: { login: Api.login, password: Api.password },
    headers: {
      'content-type': 'application/json'
    }
  });
}

const login = async () => {
  return await axios({
    method: 'post',
    url: Api.endpoint + '/auth/authenticate',
    data: { login: Api.login, password: Api.password },
    headers: {
      'content-type': 'application/json'
    }
  });
}

login().then(result => {
  console.log('logou');
  if (result.data && result.data.token) {
    console.log(result.data);
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('userId', result.data.user._id);
  }
})
  .catch(err => {
    console.log(err);
    register().then(result => {
      console.log('logou');
      if (result.data && result.data.token) {
        console.log(result.data);
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userId', result.data.user._id);
      }
    })
  })
  .finally(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
