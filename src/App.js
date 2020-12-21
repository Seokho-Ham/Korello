import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';
import CardList from './components/card/CardList.jsx';

const App = () => {
  const [logined, setLogined] = useState(false);
  const loginHandler = () => {
    setLogined(!logined);
  };

  return (
    <Router>
      <div id='header' style={{ textAlign: 'center', backgroundColor: 'aqua' }}>
        {/* <Link to='/boards'> */}
        <h2 id='header-title'>Korello</h2>
        {/* </Link> */}
      </div>
      <Route exact path='/' render={() => <Login handler={loginHandler} />} />
      <Route path='/boards' component={Board} />
      <Redirect from='/board/:id/cards' to='/boards' />
    </Router>
  );
};

export default App;
