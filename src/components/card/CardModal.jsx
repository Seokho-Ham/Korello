import React, { useState } from 'react';
import Label from '../modal/Label';
import CheckListModal from '../modal/ChecklistModal';
import Checklist from '../modal/Checklist';
import CalendarModal from '../modal/CalendarModal';
import { useSelector, useDispatch } from 'react-redux';
import { postData, updateData, getRefreshToken } from '../../api';
import { getCard } from './card_utils';
import deleteImage from '../../assets/img/delete-icon.png';
import styled from 'styled-components';
const progressCalculator = data => {
  let count = 0;
  data.forEach(el => {
    if (el.status) {
      count++;
    }
  });
  const result = Math.round((count / data.length) * 100);
  return result;
};

const CardModal = ({ clickModal, title, labels }) => {
  const { checklist, currentBoardUrl, currentCardId } = useSelector(
    state => state.card,
  );
  const [editButton, setEditButton] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const dispatch = useDispatch();
  const inputHandler = e => {
    setCardTitle(e.target.value);
  };
  const editCard = () => {
    setEditButton(p => !p);
  };
  const sendUpdate = async e => {
    e.preventDefault();
    if (cardTitle !== title) {
      let code = await updateData(
        currentBoardUrl.slice(0, currentBoardUrl.length - 1) + '/name',
        {
          id: currentCardId,
          name: cardTitle,
        },
      );
      if (code === 200) {
        setEditButton(p => !p);
        getCard(currentBoardUrl, dispatch);
      } else if (code >= 401001) {
        await getRefreshToken();
        await sendUpdate(e);
      } else {
        alert('update 실패');
      }
    } else {
      setEditButton(p => !p);
    }
  };
  const deleteCard = async () => {
    let code = await postData(
      currentBoardUrl.slice(0, currentBoardUrl.length - 1) + '/delete',
      {
        id: currentCardId,
      },
    );
    if (code === 201) {
      getCard(currentBoardUrl, dispatch);
    } else if (code >= 401001) {
      await getRefreshToken();
      await deleteCard();
    } else {
      alert('삭제에 실패하였습니다.');
    }
  };
  return (
    <>
      <ModalWrapper>
        <ModalInner tabIndex='0'>
          <button style={{ float: 'right' }} onClick={clickModal}>
            X
          </button>
          <CardDeleteButton onClick={deleteCard}></CardDeleteButton>
          <ModalHeader>
            <ModalLabels>
              {labels.length > 0
                ? labels.map((el, i) => (
                    <ModalLabelElement key={i} color={el.color}>
                      {el.name}
                    </ModalLabelElement>
                  ))
                : null}
            </ModalLabels>
            {editButton ? (
              <span>
                <h2>
                  <form onSubmit={sendUpdate}>
                    <input value={cardTitle} onChange={inputHandler} />
                    <button>save</button>
                  </form>
                </h2>
              </span>
            ) : (
              <span onClick={editCard}>
                <h2>{title}</h2>
              </span>
            )}
          </ModalHeader>
          <ModalContents>
            {checklist.length > 0 ? (
              <ChecklistContainer>
                <Checklist percent={progressCalculator(checklist)} />
              </ChecklistContainer>
            ) : null}
          </ModalContents>
          <ModalSidebar>
            <div>Sidebar</div>
            <Label labels={labels} />
            <CheckListModal />
            <CalendarModal />
          </ModalSidebar>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default CardModal;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  overflow-y: auto;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  display: block;
  position: relative;
  background-color: #ebecf0;
  border-radius: 10px;
  width: 768px;
  height: 700px;
  margin: 48px 0px 80px;
  padding: 30px 20px;
  z-index: 11;
  /* top: 50%; */
`;

const CardDeleteButton = styled.span`
  background-image: url(${deleteImage});
  background-repeat: no-repeat;
  background-size: 25px;
  height: 30px;
  width: 30px;
  align-items: center;
  float: right;
  opacity: 1;

  &:hover {
    opacity: 0.5;
  }
`;

const ModalHeader = styled.div``;
const ModalLabels = styled.div`
  overflow: auto;
  position: relative;
  box-sizing: border-box;
  color: #fff;
`;
const ModalLabelElement = styled.span`
  background-color: ${props => props.color};
  margin: 2px;
  padding: 2px 2px;
  border-radius: 4px;
  float: left;
  width: auto;
  min-width: 50px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  box-shadow: 0 2px 0 rgba(9, 30, 66, 0.25);
`;

const ModalContents = styled.div`
  float: left;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 24px;
  padding: 0 8px 8px 16px;
  position: relative;
  width: 470px;
  height: 80%;
  z-index: 0;
`;

const ChecklistContainer = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 0 rgba(9, 30, 66, 0.25);
`;

const ModalSidebar = styled.div`
  border-radius: 6px;

  float: right;
  padding: 0 16px 8px 8px;
  width: 210px;
  height: 80%;
  z-index: 10;
`;
