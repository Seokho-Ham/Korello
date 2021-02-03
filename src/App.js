import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './pages/LoginPage.jsx';
import Board from './pages/BoardPage.jsx';
import NotFound from './pages/NotFound';
import CardList from './components/card/CardList.jsx';
import Nav from './components/Nav';

const App = () => {
  const history = useHistory();
  const [login, setLogin] = useState(localStorage.getItem('loginStatus'));

  useEffect(() => {
    setLogin(localStorage.getItem('loginStatus'));
  }, []);

  return (
    <>
      {login === 'true' ? <Nav history={history} setLogin={setLogin} /> : null}
      <Switch>
        <Route exact path='/' render={props => <Login {...props} />} />

        <Route path='/boards' render={props => <Board {...props} />} />
        <Route
          path='/board/:id/cards'
          render={props => <CardList {...props} />}
        />

        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
