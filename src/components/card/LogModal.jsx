import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const LogModal = ({ openLog, openLogHandler, setOpenLog }) => {
  const modalRef = useRef(null);
  const pageClickHandler = e => {
    if (modalRef.current !== null && !modalRef.current.contains(e.target)) {
      setOpenLog(!openLog);
    }
  };
  useEffect(() => {
    if (openLog) {
      window.addEventListener('click', pageClickHandler);
    }
    return () => {
      window.removeEventListener('click', pageClickHandler);
    };
  }, [openLog]);

  return (
    <EventLogContainer ref={modalRef}>
      <EventLogHeader>
        <h3>Menu</h3>
        <button onClick={openLogHandler}>x</button>
      </EventLogHeader>
      <hr />
      <LogType>
        <span></span>
        <h4>Activity</h4>
      </LogType>
      <LogModalList>
        <LogElement>
          <span></span>
          <div>
            <div className='log-text'>강뚝딱님이 보드를 수정했습니다.</div>
            <div className='log-time'>01.26 03:41:02</div>
          </div>
        </LogElement>
      </LogModalList>
    </EventLogContainer>
  );
};

export default LogModal;

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

  button {
    vertical-align: top;
    position: relative;
    bottom: 50px;
    left: 145px;
    height: 30px;
    width: 30px;
    font-size: large;
  }
`;
export const LogType = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 15px;

  span {
    display: inline-block;
    background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/activity.png');
    background-size: 25px;
    background-repeat: no-repeat;
    width: 27px;
    height: 25px;
  }
  h4 {
    display: inline;
    margin: 0px 5px;
  }
`;
export const LogModalList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LogElement = styled.div`
  display: flex;
  flex-direction: row;
  span {
    background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/profile.png');
    background-size: 35px;
    background-repeat: no-repeat;
    width: 40px;
    height: 35px;
    margin: 0px 15px;
  }
  .log-time {
    font-size: small;
  }
`;
