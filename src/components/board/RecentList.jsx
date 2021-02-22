import React from 'react';
import BoardForm from './BoardForm';
import { useSelector } from 'react-redux';
import { ListType, List } from './BoardList';

const RecentList = () => {
  const { recentBoard } = useSelector(state => state.board);

  const renderRecentBoards = () => {
    return recentBoard.length > 0
      ? recentBoard.map(el => {
          return <BoardForm key={el.id} data={el} />;
        })
      : null;
  };

  return (
    <>
      {recentBoard.length > 0 ? (
        <>
          <ListType name='recent'>
            <span></span>
            <h3>Recently Viewed</h3>
          </ListType>
          <List>{renderRecentBoards()}</List>
        </>
      ) : null}
    </>
  );
};

export default RecentList;
