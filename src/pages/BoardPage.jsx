import React from 'react';
import { Redirect } from 'react-router-dom';
import BoardList from '../components/board/BoardList';

const BoardPage = ({ match, login }) => {
  return login === 'true' ? (
    <>
      <BoardList match={match} />
    </>
  ) : (
    <>
      <Redirect to='/' />
    </>
  );
};

export default BoardPage;
