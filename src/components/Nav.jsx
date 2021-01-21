import React from 'react';

const Nav = () => {
  // const onClickHandler = e => {
  //   e.preventDefault();
  // };

  return (
    <div id='header'>
      <div className='title'>
        <a href='/boards'>
          <span className='title-image'></span>
          <span className='title-name'></span>
        </a>
      </div>
    </div>
  );
};

export default Nav;
