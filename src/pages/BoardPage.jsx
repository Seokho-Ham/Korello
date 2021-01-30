import React, { useEffect } from 'react';
import queryString from 'query-string';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';
import { initializeUser } from '../api/index.js';
const BoardPage = ({ match, history, location }) => {
  let login = localStorage.getItem('loginStatus');

  return login === 'null' ? (
    <Router>
      <Nav />
      <Route path={match.path} component={BoardList} />
      <Route
        path={`${match.path.slice(0, match.path.length - 1)}/:id/cards`}
        component={CardList}
      />
    </Router>
  ) : (
    <Redirect to='/' />
  );
};

export default BoardPage;
