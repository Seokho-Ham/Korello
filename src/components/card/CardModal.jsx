import React from 'react';
import Label from '../modal/Label';
import CheckList from '../modal/Checklist';

const CardModal = ({ onClose, id, title, tag, url, setUpdate, labels }) => {
  return (
    <>
      <div className='modal-container' />
      <div className='modal-wrapper'>
        <div tabIndex='0' className='modal-inner'>
          <button
            className='modal-close'
            onClick={onClose}
            style={{ float: 'right' }}
          >
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
          <div className='modal-contents'>하이하이</div>
          <div className='modal-sidebar'>
            <Label url={url} id={id} setUpdate={setUpdate} labels={labels} />
            <CheckList />
            CheckList, Duedate, Calendar
          </div>
        </div>
      </div>
    </>
  );
};

export default CardModal;
