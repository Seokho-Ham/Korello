import React from 'react';
import styled from 'styled-components';
const LogList = ({ openLog, openLogHandler }) => {
  return (
    <EventLogContainer openLog>
      <EventLogHeader className='log-header'>
        <h3>Menu</h3>
        <button className='log-close' onClick={openLogHandler}>
          x
        </button>
      </EventLogHeader>
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
    </EventLogContainer>
  );
};

export default LogList;

const EventLogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 339px;
  height: 100%;
  border-radius: 3px;
  box-shadow: 0 12px 24px -6px rgba(9, 30, 66, 0.25);
  background-color: aliceblue;
  z-index: 3;
  background-color: #f4f5f7;

  hr {
    position: relative;
    left: 15px;
    size: 10px;
    background-color: rgba(9, 30, 66, 0.13);
    border: 0;
    height: 1px;
    margin: 16px 0;
    padding: 0;
    width: 90%;
  }
`;

const EventLogHeader = styled.div`
  width: 100%;
  text-align: center;
  height: 60px;

  .log-close {
    vertical-align: top;
    position: relative;
    bottom: 50px;
    left: 145px;
    height: 30px;
    width: 30px;
    font-size: large;
  }
`;
