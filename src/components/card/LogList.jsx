import React from 'react';

const LogList = ({ openLog, openLogHandler }) => {
  return (
    <div
      className='log-container'
      style={{
        width: openLog ? '339px' : '0px',
      }}
    >
      <div className='log-header'>
        <h3>Menu</h3>
        <button className='log-close' onClick={openLogHandler}>
          x
        </button>
      </div>
      <hr />
      <div className='log-type'>
        <span></span>
        <h4>Activity</h4>
      </div>
      <div className='log-list'>
        <div className='log-element'>
          <span className='log-profile'></span>
          <div className='log-data'>
            <div className='log-text'>강뚝딱님이 보드를 수정했습니다.</div>
            <div className='log-time'>01.26 03:41:02</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogList;
