import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import BoardList from '../components/board/BoardList';
import CardList from '../components/card/CardList';
import { useInitializeUser, clearStorage } from '../api/index.js';

const BoardPage = ({ match, history }) => {
  let login = localStorage.getItem('loginStatus');
  const [loginState] = useInitializeUser();

  const logoutHandler = () => {
    clearStorage();
    alert('로그아웃 되었습니다');
    history.push('/');
  };

  return login === 'true' && loginState ? (
    <Router>
      <Nav />
      <button onClick={logoutHandler}>logout</button>
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
