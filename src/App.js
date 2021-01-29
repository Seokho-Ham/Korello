import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';
import NotFound from './pages/NotFound';
import { getRefreshToken } from './api/index.js';

const App = () => {
  const history = useHistory();

  const logoutHandler = () => {
    sessionStorage.setItem('loginStatus', false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('로그아웃 되었습니다');
    history.push('/');
  };
  const checkToken = async () => {
    if (
      localStorage.getItem('refreshToken') &&
      localStorage.getItem('accessToken')
    ) {
      let result = await getRefreshToken();
      if (result === 200) {
        setTimeout(() => {
          checkToken();
        }, 50000);
      } else if (result === 401) {
        alert('토큰이 만료되었습니다. 다시 로그인해주세요!');
        history.push('/');
      } else {
        alert(result);
      }
    } else {
      sessionStorage.setItem('loginStatus', false);
    }
  };
  useEffect(() => {
    checkToken();
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
