import React from 'react';

import { clearStorage } from '../api/index';
const Nav = ({ history }) => {
  const logoutHandler = () => {
    clearStorage();
    alert('로그아웃 되었습니다');

    history.push('/');
  };
  return (
    <div id='header'>
      <div className='header-buttons'>
        <a href='/boards'>
          <span className='home-button'></span>
        </a>
      </div>
      <div className='title'>
        <a href='/boards'>
          <span className='title-image'></span>
        </a>
      </div>
      <div className='logout-bt'>
        <button onClick={logoutHandler}>logout</button>
      </div>
    </div>
  );
};

export default Nav;
