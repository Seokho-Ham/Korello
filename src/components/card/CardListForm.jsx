import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardModal from './CardModal';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../reducers/card.reducer';
import { Draggable } from 'react-beautiful-dnd';

const CardListForm = ({ id, title, labels, index, tag }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { cardlabels } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const clickModal = async () => {
    if (!modalVisible) {
      dispatch(
        setData({
          currentTagName: tag,
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
                {cardlabels[id] !== undefined && cardlabels[id].length > 0 ? (
                  <CardLabels>
                    {cardlabels[id]
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
                <CardTitle>{title}</CardTitle>
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
