import React from 'react';
import BoardList from './BoardList';

const BoardContainer = () => {
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
      <BoardList />
    </div>
  );
};

export default BoardContainer;
