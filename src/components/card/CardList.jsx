import React, { useState, useEffect } from 'react';
import TagForm from './TagForm';
import { updateData, getRefreshToken } from '../../api';
import AddTagButton from './AddTagButton';
import LogBt from './LogBt';
import LogModal from './LogModal';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getCard, setLastViewList } from './card_utils';
import styled from 'styled-components';
import bgImage from '../../api/bg-images/gradient.jpg';
import load from '../../assets/img/load.gif';
import { setData } from '../../reducers/card.reducer';

const CardList = ({ location }) => {
  const [openLog, setOpenLog] = useState(false);
  const { loading, taglist, currentBoardUrl, currentBoardId } = useSelector(
    state => state.card,
  );
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
        getCard(currentBoardUrl, dispatch, currentBoardId);
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
    } else {
      updateCard(url, destination, source, draggableId);
    }
  };

  useEffect(() => {
    const boardId = location.pathname.split('/')[2];
    dispatch(setData({ loading: true, currentBoardId: boardId }));
    setLastViewList(location);
    // getFields(boardId);
    getCard(`${location.pathname}`, dispatch, boardId);
  }, [currentBoardId]);

  const renderCards = () => {
    return taglist.map((el, i) => {
      return <TagForm key={i} tag={el} tagIndex={i} />;
    });
  };

  return (
    <Container>
      <CardContainer>
        <CardHeader>
          <CardHeaderItems>
            <LogBt openLogHandler={openLogHandler} />
          </CardHeaderItems>
        </CardHeader>
        <DragDropContext onDragEnd={onDragEnd}>
          <CardListContainer>
            {!loading ? (
              <>
                <TagList>
                  {renderCards()}
                  <AddTagButton />
                </TagList>
              </>
            ) : (
              <TagList id='tag-all-list'>
                <Loading></Loading>
              </TagList>
            )}
          </CardListContainer>
        </DragDropContext>
      </CardContainer>

      {openLog ? (
        <LogModal
          openLog={openLog}
          openLogHandler={openLogHandler}
          setOpenLog={setOpenLog}
        />
      ) : null}
    </Container>
  );
};

export default CardList;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const CardContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1 1 0%;
`;
const CardHeader = styled.div`
  height: 50px;
`;
const CardHeaderItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CardListContainer = styled.div`
  height: 90%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
`;
const TagList = styled.div`
  white-space: nowrap;
  margin-bottom: 8px;
  padding-bottom: 8px;
  height: 97%;
`;

const Loading = styled.span`
  display: inline-block;
  position: relative;
  top: 100px;
  left: 47%;
  background-image: url(${load});
  background-repeat: no-repeat;
  background-size: 130px;
  width: 130px;
  height: 130px;
`;
