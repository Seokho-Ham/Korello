import React, { useState } from 'react';
import Label from '../modal/Label';
import CheckListModal from '../modal/ChecklistModal';
import Checklist from '../modal/Checklist';
import CalendarModal from '../modal/CalendarModal';
import { useGetApi } from '../../api';

const CardModal = ({ onClose, id, title, tag, url, setUpdate, labels }) => {
  const [modalUpdate, setModalUpdate] = useState(false);
  const [data] = useGetApi('get', `/card/${id}/todo`, modalUpdate);

  const progressCalculator = data => {
    let count = 0;
    data.map(el => {
      if (el.status) {
        count++;
      }
    });
    const result = Math.round((count / data.length) * 100);
    return result;
  };

  return (
    <>
      <div className='modal-container' />
      <div className='modal-wrapper'>
        <div tabIndex='0' className='modal-inner'>
          <button className='modal-close' onClick={onClose}>
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
            {data.length > 0 ? (
              <div className='checklist-container'>
                <Checklist
                  id={id}
                  data={data}
                  setUpdate={setModalUpdate}
                  percent={progressCalculator(data)}
                />
              </div>
            ) : null}
          </div>
          <div className='modal-sidebar'>
            <Label url={url} id={id} setUpdate={setUpdate} labels={labels} />
            <CheckListModal id={id} setUpdate={setModalUpdate} />
            <CalendarModal />
            <div>CheckList, Duedate, Calendar</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardModal;
