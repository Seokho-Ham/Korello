import React, { useState } from 'react';
import queryString from 'query-string';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';
import { setAccessToken } from '../api';

const BoardPage = ({ match, history, location }) => {
  if (location.search.length > 0) {
    setAccessToken(queryString.parse(location.search));
  }

  return (
    <Router>
      <Nav />
      <Route exact path={match.path} component={BoardList} />
      <Route
        path={`${match.path.slice(0, match.path.length - 1)}/:id/cards`}
        component={CardList}
      />
    </Router>
  );
};

export default BoardPage;
