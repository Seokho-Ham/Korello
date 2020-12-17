import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import TagForm from './TagForm';
import apiHandler from '../../api/index';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const CardList = ({ history, match }) => {
  //데이터를 받아와서 나열.
  const [tagList, setTagList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [update, setUpdate] = useState(true);

  const onClickHandler = () => {
    history.goBack();
  };

  useEffect(async () => {
    const res = await apiHandler('get', `${match.url}`);
    //tagValue로 분기를 해야한다.
    //result_body.map을 사용 -> cardList state에 tagValue값을 기준으로 저장?
    //tag1 : [{id:17, name:card1, memeberNames:[] }]
    if (res.result_body.length > 0) {
      const { result_body } = res;
      const obj = {};
      const tags = [];
      const cards = [];
      result_body.map(el => {
        let cardObj = {
          id: el.id,
          name: el.name,
          tagValue: el.tagValue,
          memberNames: el.memberNames,
          createDate: el.createDate,
          updateDate: el.updateDate,
        };

        if (obj[el.tagValue]) {
          obj[el.tagValue].push(cardObj);
        } else {
          obj[el.tagValue] = [cardObj];
        }
      });
      for (let i in obj) {
        tags.push(i);
        cards.push(obj[i]);
      }
      console.log(cards);
      setTagList(tags);
      setCardList(cards);
    }
  }, [update]);

  return (
    <>
      {Object.keys(cardList).length > 0 ? (
        <>
          <button onClick={onClickHandler}>뒤로가기</button>
          <div id='all-card-list'>
            {cardList.map(el => {
              let index = cardList.indexOf(el);
              return (
                <TagForm
                  key={el.id}
                  data={el}
                  tag={tagList[index]}
                  boardUrl={match.url}
                  setUpdate={setUpdate}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default CardList;
