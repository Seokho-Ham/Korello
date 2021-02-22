import React from 'react';

import { Redirect } from 'react-router-dom';
import BoardContainer from '../components/board/BoardContainer';

const BoardPage = ({ login }) => {
  return login === 'true' ? (
    <>
      <BoardContainer />
    </>
  ) : (
    <>
      <Redirect to='/' />
    </>
  );
};

export default BoardPage;
