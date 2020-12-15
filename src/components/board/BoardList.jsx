import React, { useState } from 'react';
import BoardForm from './BoardForm';
const BoardList = props => {
  const { list } = props;

  const onClick = e => {
    //해당 board의 id값으로 get 요청
    //응답을 받아서 해당 보드의 화면을 보여주기
    alert(e + ' 보드로 입장합니다');
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
