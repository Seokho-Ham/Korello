import React from 'react';

const CardModal = ({ visible, onClose }) => {
  const wrapperStyle = {
    boxSizing: ' border-box',
    display: visible ? 'block' : 'none',
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '1000',
    overflow: 'auto',
    outline: '0',
  };

  const modalContainer = {
    boxSizing: 'border-box',
    display: visible ? 'block' : 'none',
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: '999',
  };

  const modalInner = {
    boxSizing: 'border-box',
    position: 'relative',
    boxShadow: ' 0 0 6px 0 rgba(0, 0, 0, 0.5)',
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '360px',
    maxWidth: '480px',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0 auto',
    padding: '40px 20px',
  };

  return (
    <>
      <div
        visible={visible.toString()}
        className='modal-container'
        style={modalContainer}
      />
      <div
        className='modal-wrapper'
        style={wrapperStyle}
        tabIndex='-1'
        visible={visible.toString()}
      >
        <div tabIndex='0' className='modal-inner' style={modalInner}>
          {visible && (
            <button className='modal-close' onClick={onClose}>
              X
            </button>
          )}
          Label, CheckList, Duedate, Calendar
        </div>
      </div>
    </>
  );
};

export default CardModal;
