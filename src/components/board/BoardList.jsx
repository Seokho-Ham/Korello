import React, { useState } from 'react';
import axios from 'axios';
import BoardForm from './BoardForm';

const BoardList = props => {
  const { list } = props;

  const onClick = e => {
    //해당 board의 id값으로 get 요청
    //응답을 받아서 해당 보드의 화면을 보여주기
    axios
      .get(`http:///222.117.225.28:8080/api/v1/boards/`)
      .then(res => {
        //history를 사용해서 접근
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div id='boardList'>
      {list.map(el => {
        return <BoardForm key={el.name} data={el} clickHandler={onClick} />;
      })}
    </div>
  );
};

export default BoardList;
