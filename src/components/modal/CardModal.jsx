import React, { useEffect, useRef, useState } from 'react';
import LabelContainer from './label/LabelContainer';
import CheckListModal from './checklist/ChecklistModal';
import ChecklistContent from './checklist/ChecklistContent';
import CalendarModal from './calendar/CalendarModal';
import CardEventLog from '../card/CardEventLog';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchData,
  postData,
  updateData,
  getRefreshToken,
  fetchEvents,
} from '../../api';
import { progressCalculator, updateCardEvents } from '../../helper/card';
import { setCardData } from '../../reducers/card.reducer';
import { format } from 'date-fns';

const CardModal = ({ modalVisible, setModalVisible, dueDate, title }) => {
  const {
    cardlist,
    currentTagName,
    currentCardName,
    checklist,
    cardEventLogs,
    currentBoardUrl,
    currentBoardId,
    currentCardId,
    cardlabels,
  } = useSelector(state => state.card);

  const [editButton, setEditButton] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const inputHandler = e => {
    setCardTitle(e.target.value);
  };
  const onBackgroundClick = e => {
    if (e.target === e.currentTarget) {
      setModalVisible(!modalVisible);
    }
  };
  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const editCard = () => {
    setEditButton(p => !p);
    if (editButton) inputRef.current.focus();
  };
  const sendUpdate = async e => {
    e.preventDefault();
    if (cardTitle !== currentCardName) {
      let [resultData, code] = await updateData(
        currentBoardUrl.slice(0, currentBoardUrl.length - 1) + '/name',
        {
          id: currentCardId,
          name: cardTitle,
        },
      );
      if (code === 200) {
        setEditButton(p => !p);
        const list = { ...cardlist };
        list[currentTagName].filter(
          el => el.id === currentCardId,
        )[0].name = cardTitle;
        dispatch(setCardData({ cardlist: list }));
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
    if (window.confirm('카드를 삭제하시겠습니까?')) {
      let [responseData, code] = await postData(
        currentBoardUrl.slice(0, currentBoardUrl.length - 1) + '/delete',
        {
          id: currentCardId,
        },
      );
      if (code === 201) {
        const [events] = await fetchEvents(`/events/board/${currentBoardId}`);
        let obj = { ...cardlist };
        obj[currentTagName].forEach((el, i) => {
          if (el.id === currentCardId) {
            obj[currentTagName].splice(i, 1);
          }
        });
        dispatch(
          setCardData({
            cardlist: obj,
            modalVisible: !modalVisible,
            eventlogs: events,
          }),
        );
      } else if (code >= 401001) {
        await getRefreshToken();
        await deleteCard();
      } else {
        alert('삭제에 실패하였습니다.');
      }
    }
  };
  const pageClickEvent = e => {
    if (formRef.current !== null && !formRef.current.contains(e.target)) {
      setEditButton(!editButton);
    }
  };

  useEffect(() => {
    const fetchModal = async () => {
      const [data] = await fetchData(`/card/${currentCardId}/todo`);
      const logs = await updateCardEvents(currentCardId, cardEventLogs);
      let obj = {};
      for (let key in checklist) {
        obj[key] = checklist[key];
      }

      obj[currentCardId] = data;
      dispatch(
        setCardData({
          checklist: obj,
          cardEventLogs: logs,
        }),
      );
    };
    if (!checklist[currentCardId]) {
      fetchModal();
    } else {
    }
  }, []);

  useEffect(() => {
    if (editButton) inputRef.current.focus();
  });

  useEffect(() => {
    if (editButton) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [editButton]);

  return (
    <>
      <ModalWrapper
        tabIndex='-1'
        visible={modalVisible}
        onClick={onBackgroundClick}
      >
        <ModalInner tabIndex='0' visible={modalVisible}>
          <CloseModalButton onClick={closeModal}></CloseModalButton>
          <CardDeleteButton onClick={deleteCard}>Delete Card</CardDeleteButton>
          <ModalHeader>
            <ModalLabels>
              {cardlabels[currentCardId] && cardlabels[currentCardId].length > 0
                ? cardlabels[currentCardId]
                    .sort((a, b) => a.id - b.id)
                    .map((el, i) => (
                      <ModalLabelElement key={i} color={el.color}>
                        {el.name}
                      </ModalLabelElement>
                    ))
                : null}
            </ModalLabels>
            {dueDate ? (
              <ModalDueDate>
                <span></span>
                <div>{`${format(new Date(dueDate), 'M월 d일 hh시 mm분')}`}</div>
              </ModalDueDate>
            ) : null}

            {editButton ? (
              <div className='title'>
                <form onSubmit={sendUpdate} ref={formRef}>
                  <input
                    value={cardTitle}
                    onChange={inputHandler}
                    ref={inputRef}
                  />
                </form>
              </div>
            ) : (
              <div className='title'>
                <h2 onClick={editCard}>{title}</h2>
              </div>
            )}
          </ModalHeader>
          <ModalContents>
            {checklist[currentCardId] !== undefined &&
            checklist[currentCardId].length > 0 ? (
              <ChecklistContainer>
                <ChecklistContent
                  percent={progressCalculator(checklist[currentCardId])}
                />
              </ChecklistContainer>
            ) : null}
            <CardEventLog />
          </ModalContents>
          <ModalSidebar>
            <div>Sidebar</div>
            <LabelContainer />
            <CheckListModal />
            <CalendarModal due={dueDate} />
          </ModalSidebar>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default CardModal;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  overflow-y: auto;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? 'block' : 'none')};
  position: relative;
  background-color: #ebecf0;
  border-radius: 10px;
  width: 768px;
  min-width: 768px;
  height: 90%;
  max-height: 800px;
  margin: 48px 0px 80px;
  padding: 30px 20px;
  z-index: 11;
  top: 1%;
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
  .title {
    display: inline-block;
  }
  div {
    margin-left: 15px;
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
  box-sizing: border-box;
  color: #fff;
  min-height: 38px;
`;

const ModalDueDate = styled.div`
  display: block;
  background-color: #febebe;
  margin: 10px 0px;
  padding-top: 5px;
  width: 160px;
  height: 30px;
  border-radius: 4px;
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
    margin: 0px;
    display: inline-block;
    position: relative;
    bottom: 10px;
  }
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
  /* box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25); */
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
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
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

  background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/cancel-icon.png');
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
