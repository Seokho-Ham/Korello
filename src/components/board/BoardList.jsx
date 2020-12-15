import React, { useState, useEffect } from 'react';
import apiHandler from '../../api/index';
import BoardForm from './BoardForm';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import axios from 'axios';

const BoardList = ({ match }) => {
  const [boardList, setBoardList] = useState([]);

  useEffect(async () => {
    //서버에 board 목록을 요청
    //state로 설정
    let data = await apiHandler('/boards', 'get');
    const { result_body } = data;
    if (result_body) {
      // console.log(result_body);
      setBoardList(result_body);
    } else {
      setBoardList('데이터가 없습니다.');
    }
  }, []);

  return boardList.length > 0 ? (
    <div id='board-list'>
      {boardList.map(el => {
        return <BoardForm key={el.id} url={match.path} data={el} />;
      })}
    </div>
  ) : (
    <div id='boardList'>{boardList}</div>
  );
};

export default BoardList;
