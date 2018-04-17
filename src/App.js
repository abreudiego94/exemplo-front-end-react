import React, { Component } from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Usuario } from './pages/Usuario';
let axios = require('axios');
import {
  BrowserRouter, Route,
  Link, Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

class App extends Component {


  render() {
    return (
      <Usuario />

    );
  }
}

export default App;
