import React, { memo, useState } from 'react';
import CardModal from './CardModal';
import { fetchData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';

import { setData } from '../../reducers/card.reducer';
import { Draggable } from 'react-beautiful-dnd';

const CardListForm = ({ id, title, tag, labels, index }) => {
  const [editButton, setEditButton] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const { currentBoardUrl } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const editCard = () => {
    setEditButton(p => !p);
  };

  const clickModal = () => {
    if (modalVisible) {
      dispatch(
        setData({
          checklist: [],
          currentCardId: id,
        }),
      );
    } else {
      const fetchModal = async () => {
        const [data] = await fetchData(`/card/${id}/todo`);
        dispatch(
          setData({
            checklist: data,
            currentCardId: id,
          }),
        );
      };
      fetchModal();
    }
    setModalVisible(p => !p);
  };

  return (
    <>
      {modalVisible ? (
        <CardModal
          clickModal={clickModal}
          title={title}
          tag={tag}
          labels={labels}
        />
      ) : null}
      <Draggable draggableId={id} index={index}>
        {provided => {
          return (
            <div
              className='card-wrapper'
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className='card' onClick={clickModal}>
                {labels.length > 0 ? (
                  <div className='card-labels'>
                    {labels
                      .sort((a, b) => a.id - b.id)
                      .map((el, i) => (
                        <span
                          key={i}
                          className='label'
                          style={{
                            backgroundColor: el.color,
                          }}
                        ></span>
                      ))}
                  </div>
                ) : (
                  <div className='card-labels'></div>
                )}
                <div className='card-title' onClick={editCard}>
                  {title}
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
    </>
  );
};

export default memo(CardListForm);
