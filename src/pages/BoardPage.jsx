import React, { useEffect } from 'react';
import queryString from 'query-string';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';
import { getRefreshToken } from '../api/index';

const BoardPage = ({ match, history, location }) => {
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

  const login = sessionStorage.getItem('loginStatus');

  return login ? (
    // return (
    <Router>
      <Nav />
      <Route path={match.path} component={BoardList} />
      <Route
        path={`${match.path.slice(0, match.path.length - 1)}/:id/cards`}
        component={CardList}
      />
    </Router>
  ) : (
    <>
      {alert('로그인 해주세요!')}
      <Redirect to='/' />
    </>
  );
};

export default BoardPage;
