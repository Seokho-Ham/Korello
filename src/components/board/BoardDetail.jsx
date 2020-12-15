import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardList from '../card/CardList';

const BoardDetail = ({ match, history }) => {
  // const [,] = useState();

  return (
    <div id='card-list'>
      <CardList />
    </div>
  );
};

export default BoardDetail;
