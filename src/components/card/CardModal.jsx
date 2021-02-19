import React from 'react';
import Label from '../modal/Label';
import CheckListModal from '../modal/ChecklistModal';
import Checklist from '../modal/Checklist';
import CalendarModal from '../modal/CalendarModal';
import { useSelector } from 'react-redux';

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
  const { checklist } = useSelector(state => state.card);

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
            <h2>{title}</h2>
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
