import React, { useState, useEffect } from 'react';
import apiHandler from '../../api/index';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';

const BoardList = ({ match }) => {
  const [boardList, setBoardList] = useState([]);
  const [addCheck, setAddCheck] = useState(false);
  const [boardCount, setBoardCount] = useState(0);
  // const [data, loading] = useApi('get', '/boards');

  const onClickHandler = () => {
    setAddCheck(prevState => !prevState);
  };

  useEffect(async () => {
    const { result_body } = await apiHandler('get', '/boards');
    if (!result_body) {
      setBoardList([]);
    } else {
      setBoardList(result_body);
    }
  }, [boardCount, loading]);

  const renderBoards = () => {
    return boardList.map(el => {
      return (
        <BoardForm
          key={el.id}
          url={match.path}
          data={el}
          setBoardCount={setBoardCount}
        />
      );
    });
  };
  return (
    <div id='board-container'>
      {boardList.length > 0 ? (
        <>
          <div id='board-list'>{renderBoards()}</div>
        </>
      ) : (
        <div id='board-list'>데이터가 없습니다.</div>
      )}
      {addCheck ? (
        <NewBoardForm
          onClickHandler={onClickHandler}
          setBoardCount={setBoardCount}
        />
      ) : (
        <button style={{ float: 'right' }} onClick={onClickHandler}>
          Add Board
        </button>
      )}
    </div>
  );
};

export default BoardList;
