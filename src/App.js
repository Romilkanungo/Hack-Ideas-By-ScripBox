import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import Details from './components/DetailsList/DetailsList';
import AddDetails from './components/AddDetails/AddDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={HomePage}/>
        <Route path="/details" component={Details}/>
        <Route path='/add' component={AddDetails}/>
      </Switch>
    </Router>
  );
}

export default App;
