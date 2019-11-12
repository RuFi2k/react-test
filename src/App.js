import React from 'react';
import './App.css';
import Main from './main/Main.js';
import Help_page from './Help-page.js';
import Fractal from './Fractal.js';
import Affine from './Affine/Affine.js'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return <Router>
    <Switch>
      <Route path="/" exact component={ Main }></Route>
      <Route path="/help" exact component={Help_page}>
      </Route>
      <Route path="/fractal" exact component={Fractal}></Route>
      <Route path="/triangle" exact component={Affine}></Route>
    </Switch>
  </Router>;
}

export default App;