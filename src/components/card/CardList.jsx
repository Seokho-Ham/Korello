import React from 'react';
import TagForm from './TagForm';
import { useGetCardApi } from '../../api/index';
import AddTagButton from './AddTagButton';

const CardList = ({ history, location }) => {
  const [tagList, cardList, setUpdate] = useGetCardApi(`${location.pathname}`);
  let lastViewList = JSON.parse(localStorage.getItem('lastView'));
  if (lastViewList) {
    if (lastViewList.includes(location.state.id.toString())) {
      lastViewList.splice(
        lastViewList.indexOf(location.state.id.toString()),
        1,
      );
      localStorage.setItem(
        'lastView',
        JSON.stringify([location.state.id, ...lastViewList]),
      );
    } else {
      localStorage.setItem(
        'lastView',
        JSON.stringify([location.state.id, ...lastViewList]),
      );
    }
  } else {
    localStorage.setItem('lastView', JSON.stringify([location.state.id]));
  }

  // if(lastViewList.length>0)

  console.log(location.state.id);
  const onClickHandler = () => {
    history.goBack();
  };

  return (
    <div className='card-container'>
      <div id='card-header'>
        <div id='card-header-items'>
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
          <div id='tag-all-list'>
            <div className='no-card'>Please Make a Card</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;
