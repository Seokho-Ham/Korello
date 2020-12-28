import React, { useState } from 'react';
import { useGetApi } from '../../api/index';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';

const BoardList = ({ match }) => {
  const [addCheck, setAddCheck] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data] = useGetApi('get', '/boards', addCheck, update);

  const onClickHandler = () => {
    setAddCheck(prevState => !prevState);
  };

  const renderBoards = () => {
    console.log(data);
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
      {addCheck ? (
        <NewBoardForm onClickHandler={onClickHandler} />
      ) : (
        <span id='board-add-button'>
          <button onClick={onClickHandler}>Add Board</button>
        </span>
      )}
    </div>
  );
};

export default BoardList;
