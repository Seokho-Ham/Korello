import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Nav from '../Nav';
import BoardList from './BoardList';
import CardList from '../card/CardList';
const BoardMiddleWare = ({ match, history, location }) => {
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

export default BoardMiddleWare;
