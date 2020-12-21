import React, { useState, useEffect } from 'react';
// import { Route } from 'react-router-dom';
import TagForm from './TagForm';
import { useGetCardApi } from '../../api/index';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddTagButton from './AddTagButton';

const CardList = ({ history, location }) => {
  const [tagList, cardList, setUpdate] = useGetCardApi(`${location.pathname}`);

  const onClickHandler = () => {
    history.goBack();
  };

  return (
    <>
      {cardList.length > 0 ? (
        <>
          <button onClick={onClickHandler}>뒤로가기</button>
          <div id='all-card-list'>
            {cardList.map((el, i) => {
              let index = cardList.indexOf(el);
              return (
                <TagForm
                  key={i}
                  data={el}
                  tag={tagList[index]}
                  boardUrl={location.pathname}
                  setUpdate={setUpdate}
                />
              );
            })}
          </div>
        </>
      ) : (
        <>
          <button onClick={onClickHandler}>뒤로가기</button>
        </>
      )}
      <AddTagButton url={location.pathname} setUpdate={setUpdate} />
    </>
  );
};

export default CardList;
