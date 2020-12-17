import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';

const BoardPage = ({ match, history }) => {
  const onClickHandler = () => {
    history.push('/board');
  };

  return (
    <Router>
      <div id='header' style={{ textAlign: 'center', backgroundColor: 'aqua' }}>
        <h2 id='header-title' onClick={onClickHandler} style={{ opacity: 1.0 }}>
          Korello
        </h2>
      </div>
      <Route exact path={match.path} component={BoardList} />
      <Route path={`${match.path}/:id/cards`} component={CardList} />
    </Router>
  );
};

export default BoardPage;
