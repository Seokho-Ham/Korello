import React, { useState } from 'react';
import Label from '../modal/Label';
import CheckListModal from '../modal/ChecklistModal';
import Checklist from '../modal/Checklist';

import { useSelector, useDispatch } from 'react-redux';
import { postData, updateData, getRefreshToken } from '../../api';
import { getCard } from './card_utils';
import cancelImage from '../../assets/img/cancel-icon.png';
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

const CardModal = ({ clickModal, title, labels, tag }) => {
  const {
    checklist,
    currentBoardUrl,
    currentCardId,
    currentBoardId,
  } = useSelector(state => state.card);
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
          <CloseModalButton onClick={clickModal}></CloseModalButton>
          <CardDeleteButton onClick={deleteCard}>Delete Card</CardDeleteButton>
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
              <div>
                <form onSubmit={sendUpdate}>
                  <input value={cardTitle} onChange={inputHandler} />
                  <button>Save</button>
                </form>
              </div>
            ) : (
              <div>
                <h2 onClick={editCard}>{title}</h2>
              </div>
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

const CardDeleteButton = styled.button`
  background-color: #cf513d;
  color: #fff;
  border: 0px;
  border-radius: 3px;
  padding: 7px;
  float: right;

  margin: 0px;
  margin-right: 7px;
  &:hover {
    background-color: #e2472f;
  }
`;

const ModalHeader = styled.div`
  min-height: 50px;
  div {
    min-height: 50px;
    margin-left: 15px;
    h2 {
      display: inline-block;
    }
    button {
      background-color: #5aac44;
      position: relative;
      bottom: 4px;
      padding: 5px;
      height: 33px;
      border: 0;
      margin: 0px;
      margin-left: 5px;
      color: #fff;
      border-radius: 3px;
      &:hover {
        opacity: 0.8;
      }
    }
    input {
      font-size: 25px;
      border: 0px;
      box-shadow: inset 0 0 0 2px #0079bf;
      margin: 12px 0px;
    }
  }
`;
const ModalLabels = styled.div`
  overflow: auto;
  position: relative;
  box-sizing: border-box;
  color: #fff;
  min-height: 38px;
`;
const ModalLabelElement = styled.span`
  background-color: ${props => props.color};
  margin: 2px;
  padding: 2px 2px;
  border-radius: 4px;
  float: left;
  width: auto;
  min-width: 50px;
  height: 28px;
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

const CloseModalButton = styled.span`
  float: right;

  background-image: url(${cancelImage});
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
  width: 20px;
  height: 20px;
  padding: 7px;
  opacity: 0.7;
  :hover {
    opacity: 1;
    background-color: #e2e2e2;
  }
`;
