import React, { useState, useEffect } from 'react';
import apiHandler from '../../api/index';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';

const BoardList = ({ match }) => {
  const [boardList, setBoardList] = useState([]);
  const [addCheck, setAddCheck] = useState(false);
  const [boardCount, setBoardCount] = useState(0);
  const onClickHandler = () => {
    setAddCheck(prevState => !prevState);
  };

  useEffect(async () => {
    console.log('실행');
    let res = await apiHandler('get', '/boards');
    console.log(res);
    if (!res || !res.result_body) {
      setBoardList([]);
    } else {
      const { result_body } = res;
      if (result_body.length > 0) {
        setBoardList(result_body);
      }
    }
  }, [boardCount]);

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
