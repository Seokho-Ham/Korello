import React, { useEffect } from 'react';
import RecentList from './RecentList';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from './board_utils';

const BoardList = () => {
  const { data } = useSelector(state => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    getBoard(dispatch);
  }, []);

  const renderBoards = () => {
    return data
      .sort((a, b) => Date.parse(a.createDate) - Date.parse(b.createDate))
      .map(el => {
        return <BoardForm key={el.id} data={el} />;
      });
  };

  return (
    <>
      {data.length === 0 ? (
        <div id='board-list-container'>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div id='board-list-container'>
          {data.length > 0 ? <RecentList /> : null}
          <div className='list-type'>
            <span className='workspace'></span>
            <h3>Workspace</h3>
          </div>
          <div id='board-list'>
            {data.length > 0 ? renderBoards() : '데이터가 없습니다.'}
            <div className='board-element'>
              <NewBoardForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardList;
