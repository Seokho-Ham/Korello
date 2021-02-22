import React, { useState, useEffect } from 'react';
import TagForm from './TagForm';
import { updateData, getRefreshToken } from '../../api';
import AddTagButton from './AddTagButton';
import LogBt from './LogBt';
import LogList from './LogList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
// import { moveCard } from '../../reducers/card.reducer';

import { getCard, setLastViewList } from './card_utils';

const CardList = ({ location }) => {
  const [openLog, setOpenLog] = useState(false);
  const { taglist, currentBoardUrl } = useSelector(state => state.card);
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
        getCard(currentBoardUrl, dispatch);
      } else if (code >= 401001) {
        await getRefreshToken();
        await updateCard(url, destination, source, draggableId);
      } else {
        alert('이동  실패');
      }
    }
  };

  const onDragEnd = result => {
    console.log('drag-data: ', result);
    const url = currentBoardUrl.slice(0, currentBoardUrl.length - 1);
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
      // let payload = {
      //   destination,
      //   source,
      // };
      // dispatch(moveCard(payload));
    } else {
      updateCard(url, destination, source, draggableId);
    }
  };
  useEffect(() => {
    setLastViewList(location);
    getCard(`${location.pathname}`, dispatch);
  }, []);
  const renderCards = () => {
    return taglist.map((el, i) => {
      return <TagForm key={i} tag={el} tagIndex={i} />;
    });
  };

  return (
    <div className='container'>
      <div className='card-container'>
        <div id='card-header'>
          <div id='card-header-items'>
            <AddTagButton />
            <LogBt openLogHandler={openLogHandler} />
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div id='card-list-container'>
            {taglist.length > 0 ? (
              <>
                <div id='tag-all-list'>{renderCards()}</div>
              </>
            ) : (
              <div id='tag-all-list'>
                <div className='no-card'>Please Make a Card</div>
              </div>
            )}
          </div>
        </DragDropContext>
      </div>

      <LogList openLog={openLog} openLogHandler={openLogHandler} />
    </div>
  );
};

export default CardList;
