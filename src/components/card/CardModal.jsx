import React, { useState } from 'react';
import Label from '../modal/Label';
import CheckListModal from '../modal/ChecklistModal';
import Checklist from '../modal/Checklist';
import CalendarModal from '../modal/CalendarModal';
import { useGetApi } from '../../api';

const CardModal = ({ onClose, id, title, tag, url, setUpdate, labels }) => {
  const [modalUpdate, setModalUpdate] = useState(false);
  const [data] = useGetApi('get', `/card/${id}/todo`, modalUpdate);

  // const checkboxHandler = async () => {};
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
                    ></span>
                  ))
                : null}
            </div>
            <h2>{title}</h2>
          </div>
          <div className='modal-contents'>
            <div className='check-list-container'>
              {data.length > 0 ? <Checklist data={data} /> : null}
            </div>
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
