import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BoardList from '../components/board/BoardList';

import CardList from '../components/card/CardList';

const BoardPage = ({ match }) => {
  return (
    <Router>
      <div id='header' style={{ textAlign: 'center', backgroundColor: 'aqua' }}>
        <h2>Korello</h2>
      </div>
      <Route exact path={match.path} component={BoardList} />
      <Route path={`${match.path}/:id`} component={CardList} />
    </Router>
  );
};

export default BoardPage;
