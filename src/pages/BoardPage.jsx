import React, { useEffect } from 'react';
import queryString from 'query-string';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';
import { getRefreshToken, setAccessToken } from '../api/index.js';
const BoardPage = ({ match, history, location }) => {
  const checkToken = async () => {
    if (
      localStorage.getItem('refreshToken') &&
      localStorage.getItem('accessToken')
    ) {
      let result = await getRefreshToken();
      if (result === 200) {
        setInterval(() => {
          getRefreshToken();
        }, 10000);
      } else if (result === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('loginStatus');
        alert('토큰이 만료되었습니다. 다시 로그인해주세요!');
        history.push('/');
      } else {
        alert(result);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('loginStatus');
        history.push('/');
      }
    } else {
      sessionStorage.setItem('loginStatus', false);
    }
  };
  useEffect(() => {
    checkToken();
  });
  return (
    <Router>
      <Nav />
      <Route path={match.path} component={BoardList} />
      <Route
        path={`${match.path.slice(0, match.path.length - 1)}/:id/cards`}
        component={CardList}
      />
    </Router>
  );
};

export default BoardPage;
