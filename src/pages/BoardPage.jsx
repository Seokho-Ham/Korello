import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BoardList from '../components/board/BoardList';

import CardList from '../components/card/CardList';

const BoardPage = ({ match }) => {
  return (
    <Router>
      <div
        id='header'
        style={{ textAlign: 'center', backgroundColor: 'aqua', margin: '0px' }}
      >
        <Link to='/board'>
          <h2 style={{ margin: '0px' }}>Korello</h2>
        </Link>
      </div>
      <Route exact path={match.path} component={BoardList} />
      <Route path={`${match.path}/:id/cards`} component={CardList} />
    </Router>
  );
};

export default BoardPage;
