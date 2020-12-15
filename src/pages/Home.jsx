import React, { useState } from 'react';
import LoginPage from './LoginPage';
import BoardPage from './BoardPage';

const Home = () => {
  const [logined, setLogined] = useState(true);

  return logined ? <BoardPage /> : <LoginPage />;
};

export default Home;
