import React, { useState, useEffect } from 'react';

import BoardList from '../components/board/BoardList';
const BoardPage = () => {
  const [boardList, setBoardList] = useState([
    { name: '1번 보드', type: 'todo', color: 'red' },
    { name: '2번 보드', type: 'task', color: 'blue' },
    { name: '3번 보드', type: 'develop', color: 'green' },
  ]);

  return <BoardList list={boardList} />;
};

export default BoardPage;
