import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from 'react-router-dom';
import TemplateForm from '../components/board/TemplateForm';

import BoardList from '../components/board/BoardList';

const BoardPage = props => {
  // const history = useHistory();
  const { login } = props;
  const [boardList, setBoardList] = useState([
    { name: '1번 보드', type: 'todo', color: '#FFEC33' },
    { name: '2번 보드', type: 'task', color: '#B2FF33' },
    { name: '3번 보드', type: 'develop', color: '#33FFE6' },
  ]);
  console.log(login);
  return (
    <Router>
      <Route exact path='/board'>
        <BoardList list={boardList} />
      </Route>
      <Route path={`/board/${boardList.type}`}>
        <TemplateForm />
      </Route>
    </Router>
  );
};

export default BoardPage;
