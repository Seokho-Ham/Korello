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
    <div className='card-container'>
      <div id='card-header'>
        <div id='card-header-items'>
          <div className='go-back'>
            <a className='go-back-button' onClick={onClickHandler}>
              <span className='go-back-img'></span>
            </a>
          </div>
          <AddTagButton url={location.pathname} setUpdate={setUpdate} />
        </div>
      </div>
      <div id='card-list-container'>
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
    </div>
  );
};

export default CardList;
