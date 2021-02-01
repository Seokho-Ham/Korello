import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';
import { useInitializeUser } from '../api/index.js';

const BoardPage = ({ match, history }) => {
  let login = localStorage.getItem('loginStatus');
  // const [loginState] = useInitializeUser();

  return login === 'true' ? (
    <Router>
      <Route path={match.path} component={BoardList} />
      <Route
        path={`${match.path.slice(0, match.path.length - 1)}/:id/cards`}
        component={CardList}
      />
    </Router>
  ) : (
    <>
      <Redirect to='/' />
    </>
  );
};

export default BoardPage;
