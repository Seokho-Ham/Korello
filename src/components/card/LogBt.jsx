import React from 'react';

const LogBt = ({ openLogHandler }) => {
  return (
    <div className='log-button'>
      <span className='log-img' onClick={openLogHandler}></span>
    </div>
  );
};

export default LogBt;
