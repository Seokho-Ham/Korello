import React from 'react';
import BoardForm from './BoardForm';
import { useSelector } from 'react-redux';
const RecentList = () => {
  const { data } = useSelector(state => state.board);
  const makeRecentList = () => {
    let result = [];
    let lastView = localStorage.getItem('lastView');
    if (lastView !== null && JSON.parse(lastView).length > 0) {
      let boards = JSON.parse(lastView)
        .map(element => {
          return data.filter(e => e.id === element)[0];
        })
        .filter(el => el);
      result = boards;
    } else {
      result = [];
    }
    return result;
  };
  const renderRecentBoards = () => {
    let recentList = makeRecentList();
    return recentList.length > 0
      ? recentList.map(el => {
          return <BoardForm key={el.id} data={el} />;
        })
      : null;
  };

  return (
    <>
      {makeRecentList().length > 0 ? (
        <div>
          <div className='list-type'>
            <span className='recent'></span>
            <h3>Recently Viewed</h3>
          </div>
          <div id='board-list'>{renderRecentBoards()}</div>
        </div>
      ) : null}
    </>
  );
};

export default RecentList;
