import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';

const BoardPage = ({ match, history }) => {
  return (
    <Router>
      <Route exact path={match.path} component={BoardList} />
      <Route
        path={`${match.path.slice(0, match.path.length - 1)}/:id/cards`}
        component={CardList}
      />
    </Router>
  );
};

export default BoardPage;
