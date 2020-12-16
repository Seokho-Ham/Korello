import React, { useState, useEffect } from 'react';
import CardForm from './CardForm';
import apiHandler from '../../api/index';
import data from '../../assets/data';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const CardList = ({ history, match }) => {
  //데이터를 받아와서 나열.
  const [cardList, setCardList] = useState([]);
  const onClickHandler = () => {
    history.goBack();
  };
  useEffect(async () => {
    // const data = await apiHandler('get', `${match.url}/cards`);
  }, []);

  return (
    <>
      <button onClick={onClickHandler}>뒤로가기</button>
      <div id='all-card-list'>
        {data.map(el => {
          return <CardForm key={el.id} data={el} />;
        })}
      </div>
    </>
  );
};

export default CardList;
