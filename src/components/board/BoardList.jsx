import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardForm from './BoardForm';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const BoardList = ({ match }) => {
  const [boardList, setBoardList] = useState([
    { id: 101, name: '1번 보드', type: 'todo', color: '#FFEC33' },
    { id: 102, name: '2번 보드', type: 'task', color: '#B2FF33' },
    { id: 103, name: '3번 보드', type: 'develop', color: '#33FFE6' },
  ]);

  const onClick = e => {
    //해당 board의 id값으로 get 요청
    //응답을 받아서 해당 보드의 화면을 보여주기
    // axios
    //   .get(`http:///222.117.225.28:8080/api/v1/boards/`)
    //   .then(res => {
    //     //history를 사용해서 접근
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  };
  useEffect(() => {
    //서버에 board 목록을 요청
    //state로 설정
    // axios
    //   .get(`http:///222.117.225.28:8080/api/v1/boards/`)
    //   .then(res => {
    //     setBoardList(res.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  });

  return (
    <div id='boardList'>
      {boardList.map(el => {
        return (
          <Link to={`${match.path}/${el.type}`}>
            <BoardForm key={el.id} data={el} clickHandler={onClick} />
          </Link>
        );
      })}
    </div>
  );
};

export default BoardList;
