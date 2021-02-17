import React, { useState } from 'react';
import TagForm from './TagForm';
import { useGetCardApi } from '../../api/index';
import AddTagButton from './AddTagButton';
import LogBt from './LogBt';
import LogList from './LogList';

const CardList = ({ location }) => {
  const [openLog, setOpenLog] = useState(false);

  const openLogHandler = () => {
    setOpenLog(p => !p);
  };
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

  return (
    <div className='container'>
      <div className='card-container'>
        <div id='card-header'>
          <div id='card-header-items'>
            <AddTagButton url={location.pathname} setUpdate={setUpdate} />
            <LogBt openLogHandler={openLogHandler} />
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

      <LogList openLog={openLog} openLogHandler={openLogHandler} />
    </div>
  );
};

export default CardList;
