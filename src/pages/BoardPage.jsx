import React from 'react';
import queryString from 'query-string';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';
import { setAccessToken, accessToken } from '../api';

const BoardPage = ({ match, history, location }) => {
  if (location.search.length > 0) {
    setAccessToken(queryString.parse(location.search));
  }

  return accessToken.length > 0 ? (
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
      {alert('로그인을 해주세요')}
      <Redirect to='/' />
    </>
  );
};

export default BoardPage;
