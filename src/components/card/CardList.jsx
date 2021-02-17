import React, { useEffect, useState } from 'react';
import TagForm from './TagForm';
import { useGetCardApi, useUpdateApi, getRefreshToken } from '../../api/index';
import AddTagButton from './AddTagButton';
import LogBt from './LogBt';
import LogList from './LogList';
import { DragDropContext } from 'react-beautiful-dnd';
import updateData from '../../api/updateAPI';
import { useDispatch } from 'react-redux';
const CardList = ({ location, data, fetchCard }) => {
  const [openLog, setOpenLog] = useState(false);
  const { tagList, cardList } = data;
  const dispatch = useDispatch();
  const openLogHandler = () => {
    setOpenLog(p => !p);
  };
  const updateCard = async (url, destination, source, draggableId) => {
    if (
      source.droppableId !== destination.droppableId &&
      destination.droppableId !== null
    ) {
      const code = await updateData(url + '/tag', {
        id: draggableId,
        tagValue: destination.droppableId,
      });
      if (code === 200) {
        fetchCard(`${location.pathname}`, dispatch);
      } else if (code >= 401001) {
        await getRefreshToken();
        await updateCard(url, destination, source, draggableId);
      } else {
        alert('이동  실패');
      }
    }
  };

  const onDragEnd = result => {
    const url = location.pathname.slice(0, location.pathname.length - 1);
    let { destination, source, draggableId } = result;

    if (
      destination === null ||
      source === null ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return '';
    }
    if (source.droppableId === destination.droppableId) {
      //순서 바꾸는 작업
    } else {
      updateCard(url, destination, source, draggableId);
    }
  };

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
  useEffect(() => {
    fetchCard(`${location.pathname}`, dispatch);
  }, []);

  const renderCards = () => {
    return cardList.map((el, i) => {
      return (
        <TagForm
          key={i}
          data={el}
          tag={el[0].tagValue}
          boardUrl={location.pathname}
          // setUpdate={setUpdate}
          tagIndex={i}
        />
      );
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='container'>
        <div className='card-container'>
          <div id='card-header'>
            <div id='card-header-items'>
              <AddTagButton url={location.pathname} />
              <LogBt openLogHandler={openLogHandler} />
            </div>
          </div>
          <div id='card-list-container'>
            {cardList.length > 0 ? (
              <div id='tag-all-list'>{renderCards()}</div>
            ) : (
              <div id='tag-all-list'>
                <div className='no-card'>Please Make a Card</div>
              </div>
            )}
          </div>
        </div>

        <LogList openLog={openLog} openLogHandler={openLogHandler} />
      </div>
    </DragDropContext>
  );
};

export default CardList;
