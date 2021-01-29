import React from 'react';
import queryString from 'query-string';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';

const BoardPage = ({ match, history, location }) => {
  const login = sessionStorage.getItem('loginStatus');
  return login === 'true' ? (
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
      {/* {alert('로그인 해주세요!')} */}
      <Redirect to='/' />
    </>
  );
};

export default BoardPage;
