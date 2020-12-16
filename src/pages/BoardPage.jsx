import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BoardList from '../components/board/BoardList';

import Nav from '../components/common/Nav';
import CardList from '../components/card/CardList';

const BoardPage = ({ match }) => {
  return (
    <Router>
      <Nav />
      <Route exact path={match.path} component={BoardList} />
      <Route path={`${match.path}/:id`} component={CardList} />
    </Router>
  );
};

export default BoardPage;
