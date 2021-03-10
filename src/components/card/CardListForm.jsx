import React, { memo, useEffect, useState } from 'react';
import CardModal from './CardModal';
import { fetchData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setData } from '../../reducers/card.reducer';
import { Draggable } from 'react-beautiful-dnd';

const CardListForm = ({ id, title, tag, labels, index }) => {
  const [editButton, setEditButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { checklist } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const editCard = () => {
    setEditButton(p => !p);
  };

  const clickModal = async () => {
    // const fetchModal = async () => {
    //   const [data] = await fetchData(`/card/${id}/todo`);
    //   let obj = {};
    //   for (let key in checklist) {
    //     obj[key] = checklist[key];
    //   }
    //   obj[id] = data;
    //   dispatch(
    //     setData({
    //       checklist: obj,
    //       currentCardId: id,
    //     }),
    //   );
    // };
    // if (!modalVisible) {
    //   if (!checklist[id]) {
    //     await fetchModal();
    //   } else {
    //     dispatch(
    //       setData({
    //         currentCardId: id,
    //       }),
    //     );
    //   }
    // }
    if (!modalVisible) {
      dispatch(
        setData({
          currentCardId: id,
        }),
      );
    }
    setModalVisible(p => !p);
  };

  return (
    <>
      {modalVisible && (
        <CardModal
          visible={modalVisible}
          clickModal={clickModal}
          title={title}
          tag={tag}
          labels={labels}
        />
      )}

      <Draggable draggableId={id} index={index}>
        {provided => {
          return (
            <CardWrapper
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Card onClick={clickModal}>
                {labels.length > 0 ? (
                  <CardLabels>
                    {labels
                      .sort((a, b) => a.id - b.id)
                      .map((el, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: el.color,
                          }}
                        ></span>
                      ))}
                  </CardLabels>
                ) : (
                  <CardLabels></CardLabels>
                )}
                <CardTitle onClick={editCard}>{title}</CardTitle>
              </Card>
            </CardWrapper>
          );
        }}
      </Draggable>
    </>
  );
};

export default memo(CardListForm);

const CardWrapper = styled.div`
  display: block;
  border-radius: 4px;
  margin: 10px;
  min-height: 40px;
`;

const Card = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 0 rgba(9, 30, 66, 0.25);
  min-height: 40px;
`;

const CardLabels = styled.div`
  overflow: auto;
  position: relative;
  min-height: 8px;
  span {
    margin: 0px 2px 2px 2px;
    padding: 1px, 2px;
    border-radius: 10px;
    float: left;
    width: 48px;
    height: 8px;
  }
`;

const CardTitle = styled.div`
  display: inline-block;
  position: relative;
  top: 1px;
  left: 3px;
  font-size: 14px;
  font-weight: 500;
`;
