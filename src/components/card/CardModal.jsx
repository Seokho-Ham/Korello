import React from 'react';
import Label from '../modal/Label';

const CardModal = ({ onClose, id, title, tag, url }) => {
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
            <h2>{title}</h2>
          </div>
          <div className='modal-contents'>하이하이</div>
          <div className='modal-sidebar'>
            <Label url={url} id={id} />
            CheckList, Duedate, Calendar
          </div>
        </div>
      </div>
    </>
  );
};

export default CardModal;
