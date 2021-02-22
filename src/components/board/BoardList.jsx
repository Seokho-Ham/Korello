import React from 'react';
import List from './List';

const BoardList = () => {
  return (
    <div id='board-container'>
      <div id='board-sidebar'>
        <nav className='board-sidebar-nav'>
          <div className='nav1'>
            <a className='board-sidebar-boards' href='/boards'>
              Boards
            </a>
          </div>
        </nav>
      </div>
      <List />
    </div>
  );
};

export default BoardList;
