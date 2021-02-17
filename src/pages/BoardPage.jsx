import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BoardList from '../components/board/BoardList';

const BoardPage = ({ match, login }) => {
  // const loginStatus = useSelector(state => state.user.status);
  // console.log(loginStatus);
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
