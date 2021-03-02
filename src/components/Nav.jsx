import React, { useState } from 'react';
import { clearStorage } from '../api';
const Nav = ({ history, setLogin }) => {
  const [boardButton, setBoardButton] = useState(false);

  const logoutHandler = () => {
    clearStorage();
    alert('로그아웃 되었습니다');
    setLogin(p => {
      if (p === 'true') {
        setLogin('false');
      } else {
        setLogin('true');
      }
    });
    history.push('/');
  };
  // const onClickHandler = () => {
  //   // if (!boardButton) {
  //   //   getCard();
  //   // }
  //   setBoardButton(p => !p);
  // };

  return (
    <div id='header'>
      <div className='header-buttons'>
        <a href='/boards'>
          <span className='home-button'></span>
        </a>
        {/* <button onClick={onClickHandler}>Boards</button>
        {boardButton ? <BoardButtonModal /> : null} */}
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
