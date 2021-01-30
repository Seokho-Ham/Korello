import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';
import NotFound from './pages/NotFound';
import { setAccessToken, getRefreshToken } from './api/index';
import queryString from 'query-string';

const App = () => {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('로그아웃 되었습니다');
    history.push('/');
  };
  useEffect(async () => {
    await getRefreshToken();
    let token = localStorage.getItem('accessToken');
    setAccessToken(token);
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <button onClick={logoutHandler}>logout</button>

      <Switch>
        <Route exact path='/' render={props => <Login {...props} />} />

        <Route path='/boards' render={props => <Board {...props} />} />
        <Redirect from='/board/:id/cards' to='/boards' />
        <Route component={NotFound} />
      </Switch>
    </DndProvider>
  );
};

export default App;
