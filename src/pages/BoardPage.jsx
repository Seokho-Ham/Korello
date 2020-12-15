import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BoardList from '../components/board/BoardList';
import BoardDetail from '../components/board/BoardDetail';
import Nav from '../components/common/Nav';

const BoardPage = ({ match }) => {
  return (
    <Router>
      <Nav />
      <Route exact path={match.path} component={BoardList} />
      <Route path={`${match.path}/:id`} component={BoardDetail} />
    </Router>
  );
};

export default BoardPage;
