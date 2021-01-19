import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';
import NotFound from './pages/NotFound';
import axios from 'axios';

const App = () => {
  const onSilentRefresh = async token => {
    // let data = await axios.post()
  };

  useEffect(() => {
    onSilentRefresh();
  });
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div id='header'>
          <h2 id='header-title'>Korello</h2>
        </div>
        <Switch>
          <Route
            exact
            path='/'
            render={() => <Login refreshToken={onSilentRefresh} />}
          />

          <Route path='/boards' component={Board} />
          <Redirect from='/board/:id/cards' to='/boards' />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </DndProvider>
  );
};

export default App;
