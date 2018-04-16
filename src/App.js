import React, { Component } from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Usuario } from './pages/Usuario';
let axios = require('axios');
class App extends Component {



  render() {


    return (
      <Usuario />

    );
  }
}

export default App;
