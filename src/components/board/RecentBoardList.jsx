import React from 'react';
import BoardElement from './BoardElement';
import { useSelector } from 'react-redux';
import { ListType, List } from './BoardListContainer';
import { MdAccessTime } from 'react-icons/md';

const RecentBoardList = () => {
  const { recentBoard } = useSelector(state => state.board);

  const renderRecentBoards = () => {
    return recentBoard.length > 0
      ? recentBoard.map(el => {
          return <BoardElement key={el.id} data={el} />;
        })
      : null;
  };

  return (
    <>
      {recentBoard.length > 0 ? (
        <>
          <ListType name='recent'>
            <MdAccessTime size='25' />
            <h3>Recently Viewed</h3>
          </ListType>
          <List>{renderRecentBoards()}</List>
        </>
      ) : null}
    </>
  );
};

export default RecentBoardList;
