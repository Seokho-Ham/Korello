import React, { useState } from 'react';
import LoginPage from './LoginPage';
import BoardPage from './BoardPage';

const Home = () => {
  const [logined, setLogined] = useState(false);
  const loginHandler = () => {
    setLogined(!logined);
  };

  return (
    // logined ? (
    //   <BoardPage login={logined} />
    // ) : (
    <LoginPage handler={loginHandler} />
  );
};

export default Home;
