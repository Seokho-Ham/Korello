import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardModal from '../modal/CardModal';
import { useDispatch, useSelector } from 'react-redux';
import { setCardData } from '../../reducers/card.reducer';
import { Draggable } from 'react-beautiful-dnd';

const CardElement = ({ id, title, index, tag, dueDate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { cardlabels } = useSelector(state => state.card);
  const dispatch = useDispatch();
  const clickModal = async () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      dispatch(
        setCardData({
          currentTagName: tag,
          currentCardId: id,
          currentCardName: title,
        }),
      );
    }
  };

  return (
    <>
      {modalVisible && (
        <CardModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
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
                ) : null}
                <CardTitle>{title}</CardTitle>
                {dueDate ? (
                  <CardDueDate>
                    <span></span>
                    <div>Apr 13</div>
                  </CardDueDate>
                ) : null}
              </Card>
            </CardWrapper>
          );
        }}
      </Draggable>
    </>
  );
};

export default memo(CardElement);

const CardWrapper = styled.div`
  display: block;
  border-radius: 4px;
  margin: 10px;
  min-height: 40px;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 3px 8px;
  box-shadow: 0 2px 0 rgba(9, 30, 66, 0.25);
  min-height: 40px;
`;

const CardLabels = styled.div`
  overflow: auto;
  position: relative;
  min-height: 8px;
  span {
    margin: 4px 2px;
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

  left: 3px;
  font-size: 14px;
  font-weight: 500;
`;

const CardDueDate = styled.div`
  display: block;
  background-color: #febebe;
  width: 80px;
  height: 27px;
  /* box-shadow: 0 2px 0 rgba(9, 20, 44, 0.1); */
  border-radius: 4px;
  margin: 5px 0px;

  font-size: 14px;
  font-weight: 500;
  color: #fff;
  span {
    display: inline-block;
    background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/clock.png');
    background-size: 25px;
    background-repeat: no-repeat;
    position: relative;
    top: 1px;
    width: 29px;
    height: 28px;
    margin: 0px;
  }
  div {
    display: inline-block;
    position: relative;
    bottom: 10px;
  }
`;
