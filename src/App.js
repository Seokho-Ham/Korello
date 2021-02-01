import React, { useEffect } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';
import NotFound from './pages/NotFound';
import { getRefreshToken, useInitializeUser } from './api/index';
import queryString from 'query-string';

const App = () => {
  const history = useHistory();
  const [loginState] = useInitializeUser();

  const logoutHandler = () => {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('로그아웃 되었습니다');
    history.push('/');
  };

  // useEffect(() => {
  //   let loginStatus = localStorage.getItem('loginStatus');

  //   const initializeUser = async () => {
  //     console.log('initializeUser method 실행!');

  //     let refreshToken = localStorage.getItem('refreshToken');
  //     if (refreshToken !== null) {
  //       let code = await getRefreshToken(refreshToken);
  //       console.log('refresh token 결과: ', code);
  //       if (code === 200) {
  //         history.push('/boards');
  //       } else if (code === 401) {
  //         history.push('/');
  //       }
  //     } else {
  //       history.push('/');
  //     }
  //   };
  //   if (loginStatus === 'true') {
  //     initializeUser();
  //   }
  // }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <button onClick={logoutHandler}>logout</button>

      <Switch>
        <Route exact path='/' render={props => <Login {...props} />} />

        <Route
          path='/boards'
          render={props => <Board {...props} login={loginState} />}
        />
        <Redirect from='/board/:id/cards' to='/boards' />
        <Route component={NotFound} />
      </Switch>
    </DndProvider>
  );
};

export default App;
