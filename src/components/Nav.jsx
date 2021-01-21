import React from 'react';

const Nav = () => {
  // const onClickHandler = e => {
  //   e.preventDefault();
  // };

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
    </div>
  );
};

export default Nav;
