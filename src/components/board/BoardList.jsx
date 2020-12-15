import React, { useState, useEffect } from 'react';
import apiHandler from '../../api/index';
import BoardForm from './BoardForm';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

const BoardList = ({ match }) => {
  const [boardList, setBoardList] = useState([
    // { id: 101, name: '1번 보드', type: 'todo', color: '#FFEC33' },
    // { id: 102, name: '2번 보드', type: 'task', color: '#B2FF33' },
    // { id: 103, name: '3번 보드', type: 'develop', color: '#33FFE6' },
  ]);

  useEffect(async () => {
    //서버에 board 목록을 요청
    //state로 설정
    let data = await apiHandler('/boards', 'get');
    console.log('하하하');
    const { result_body } = data;
    console.log(data);
    if (result_body) {
      // console.log(result_body);
      setBoardList(result_body);
    } else {
      setBoardList([]);
    }
  }, []);

  return boardList.length > 0 ? (
    <div id='boardList'>
      {boardList.map(el => {
        return <BoardForm key={el.id} url={match.path} data={el} />;
      })}
    </div>
  ) : (
    <div id='boardList'></div>
  );
};

export default BoardList;
