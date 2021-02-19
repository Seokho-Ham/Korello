import React, { useState } from 'react';
import Label from '../modal/Label';
import CheckListModal from '../modal/ChecklistModal';
import Checklist from '../modal/Checklist';
import CalendarModal from '../modal/CalendarModal';
import { useSelector, useDispatch } from 'react-redux';
import { updateData, getRefreshToken } from '../../api';
import { getCard } from '../../containers/CardContainer';

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
  return (
    <>
      <div className='modal-container' />
      <div className='modal-wrapper'>
        <div tabIndex='0' className='modal-inner'>
          <button className='modal-close' onClick={clickModal}>
            X
          </button>
          <div className='modal-header'>
            <div className='modal-labels'>
              {labels.length > 0
                ? labels.map((el, i) => (
                    <span
                      key={i}
                      className='label'
                      style={{
                        backgroundColor: el.color,
                      }}
                    >
                      {el.name}
                    </span>
                  ))
                : null}
            </div>
            {editButton ? (
              <span className='card-input'>
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
          </div>
          <div className='modal-contents'>
            {checklist.length > 0 ? (
              <div className='checklist-container'>
                <Checklist percent={progressCalculator(checklist)} />
              </div>
            ) : null}
          </div>
          <div className='modal-sidebar'>
            <Label labels={labels} />
            <CheckListModal />
            <CalendarModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardModal;
