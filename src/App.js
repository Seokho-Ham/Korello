import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';
// import CardList from './components/card/CardList.jsx';

const App = () => {
  const [logined, setLogined] = useState(false);
  const loginHandler = () => {
    setLogined(!logined);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div id='header'>
          <h2 id='header-title'>Korello</h2>
        </div>
        <Route exact path='/' render={() => <Login handler={loginHandler} />} />
        <Switch>
          <Route path='/boards' component={Board} />
          <Redirect from='/board/:id/cards' to='/boards' />
        </Switch>
      </Router>
    </DndProvider>
  );
};

export default App;
