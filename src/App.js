import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';

const App = () => {
  const [logined, setLogined] = useState(false);
  const loginHandler = () => {
    setLogined(!logined);
  };

  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => <Login handler={loginHandler} />} />
        <Route path='/board' component={Board} />
      </Switch>
    </Router>
  );
};

export default App;
