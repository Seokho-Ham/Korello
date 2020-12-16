import React, { useState, useEffect } from 'react';
import apiHandler from '../../api/index';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';

const BoardList = ({ match }) => {
  const [boardList, setBoardList] = useState([]);
  const [addCheck, setAddCheck] = useState(false);

  const onClickHandler = () => {
    setAddCheck(prevState => !prevState);
  };

  useEffect(async () => {
    //서버에 board 목록을 요청
    //state로 설정
    let data = await apiHandler('get', '/boards');
    console.log(data);

    if (!data) {
      setBoardList([]);
    } else {
      const { result_body } = data;
      if (result_body.length > 0) {
        setBoardList(result_body);
      }
    }
  }, []);

  return (
    <>
      {boardList.length > 0 ? (
        <>
          <div id='board-list'>
            {boardList.map(el => {
              return <BoardForm key={el.id} url={match.path} data={el} />;
            })}
          </div>
        </>
      ) : (
        <div id='board-list'>데이터가 없습니다.</div>
      )}
      {addCheck ? (
        <NewBoardForm onClickHandler={onClickHandler} />
      ) : (
        <button style={{ float: 'right' }} onClick={onClickHandler}>
          Add Board
        </button>
      )}
    </>
  );
};

export default BoardList;
