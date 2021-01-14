import React, { useState } from 'react';
import { useGetApi } from '../../api/index';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';

const BoardList = ({ match }) => {
  const [update, setUpdate] = useState(false);
  const [display, setDisplay] = useState(false);
  const [data] = useGetApi('get', '/boards', update);

  const onClickHandler = () => {
    setDisplay(p => !p);
  };

  const renderBoards = () => {
    return data.map(el => {
      return (
        <BoardForm
          key={el.id}
          url={match.path}
          data={el}
          setUpdate={setUpdate}
        />
      );
    });
  };
  return (
    <div id='board-container'>
      {data.length > 0 ? (
        <>
          <div id='board-list'>{renderBoards()}</div>
        </>
      ) : (
        <div id='board-list'>데이터가 없습니다.</div>
      )}
      <span id='board-add-button'>
        <NewBoardForm
          onClickHandler={onClickHandler}
          setUpdate={setUpdate}
          display={display}
        />
        <button
          onClick={onClickHandler}
          style={{ display: display ? 'none' : 'block' }}
        >
          Add Board
        </button>
      </span>
    </div>
  );
};

export default BoardList;
