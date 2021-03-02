import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';
import NotFound from './pages/NotFound';
import Nav from './components/Nav';
import CardPage from './pages/CardPage.jsx';
// import { useDispatch, useSelector } from 'react-redux';
const App = () => {
  const history = useHistory();
  const [login, setLogin] = useState(localStorage.getItem('loginStatus'));

  useEffect(() => {
    setLogin(localStorage.getItem('loginStatus'));
  }, []);
  // const loginStatus = useSelector(state => state.user.status);
  // console.log(loginStatus);

  return (
    <>
      {login === 'true' ? <Nav history={history} setLogin={setLogin} /> : null}
      <Switch>
        <Route
          exact
          path='/'
          render={props => <Login {...props} login={login} />}
        />
        <Route
          path='/boards'
          render={props => <Board {...props} login={login} />}
        />
        <Route
          path='/board/:id/cards'
          render={props => <CardPage {...props} login={login} />}
        />

        <Route path='/notfound' render={NotFound} />
      </Switch>
    </>
  );
};

export default App;
