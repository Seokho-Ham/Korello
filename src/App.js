import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Home} />

      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/board' component={Board} />
      </Switch>
    </Router>
  );
};

export default App;
