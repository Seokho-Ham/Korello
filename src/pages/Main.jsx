import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
} from 'react-router-dom';
import Login from './LoginPage.jsx';
import Board from './BoardPage.jsx';
import NotFound from './NotFound';
import { setAccessToken } from '../api';

const Main = () => {
  const [login, setLogin] = useState(false);
  const history = useHistory();

  const logoutHandler = () => {
    setLogin(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('로그아웃 되었습니다');
    history.push('/');
  };
  const checkToken = () => {
    if (
      localStorage.getItem('refreshToken') &&
      localStorage.getItem('accessToken')
    ) {
      let refreshToken = localStorage.getItem('refreshToken');
      //서버에 요청해보고 응답에 따라 화면 다르게.
      //새로운 토큰이 오면 localStorage에 저장
      //setTimeout 설정해서 자동으로 갱신 요청
      //다른 응답이면 로그인 화면으로 이동.
      console.log('refreshToken: ', refreshToken);

      setAccessToken(refreshToken);
      setLogin(true);
      // setInterval(() => {
      //   console.log('시간은 간다!');
      // }, 1000);
      history.push('/boards');
    } else {
      history.push('/');
    }
  };
  useEffect(() => {
    checkToken();
  }, [login]);

  return (
    <div>
      <button onClick={logoutHandler}>logout</button>
      <Switch>
        <Route
          exact
          path='/'
          render={props => (
            <Login {...props} login={login} setLogin={setLogin} />
          )}
        />

        <Route
          path='/boards'
          render={props => <Board {...props} login={login} />}
        />
        <Redirect from='/board/:id/cards' to='/boards' />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Main;
