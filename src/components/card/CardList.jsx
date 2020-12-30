import React from 'react';
import TagForm from './TagForm';
import { useGetCardApi } from '../../api/index';
import AddTagButton from './AddTagButton';

const CardList = ({ history, location }) => {
  const [tagList, cardList, setUpdate] = useGetCardApi(`${location.pathname}`);

  const onClickHandler = () => {
    history.goBack();
  };

  return (
    <div id='one-board'>
      <button className='go-back' onClick={onClickHandler}>
        뒤로가기
      </button>
      <AddTagButton url={location.pathname} setUpdate={setUpdate} />
      {cardList.length > 0 ? (
        <div id='tag-all-list'>
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
      ) : (
        <div id='tag-all-list'></div>
      )}
    </div>
  );
};

export default CardList;
