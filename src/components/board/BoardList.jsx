import React from 'react';
import BoardContainer from '../../containers/BoardContainer';

const BoardList = ({ match }) => {
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
      <BoardContainer match={match} />
    </div>
  );
};

export default BoardList;
