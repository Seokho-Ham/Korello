import React, { useEffect } from 'react';
import RecentList from './RecentList';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from './board_utils';
import { Board, ListType, List, BoardElement } from './board.style/style';

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
        <Board>
          <h3>Loading...</h3>
        </Board>
      ) : (
        <Board>
          {data.length > 0 ? <RecentList /> : null}
          <ListType name='workspace'>
            <span></span>
            <h3>Workspace</h3>
          </ListType>
          <List>
            {data.length > 0 ? renderBoards() : '데이터가 없습니다.'}
            <BoardElement>
              <NewBoardForm />
            </BoardElement>
          </List>
        </Board>
      )}
    </>
  );
};

export default BoardList;
