import React from 'react';
import styled from 'styled-components';
import { LogType, LogElement, LogModalList } from './LogModal';
const CardEventLog = () => {
  return (
    <CardEventContainer>
      <CardEventActivity>
        <h4>Activity</h4>
      </CardEventActivity>
      <LogModalList>
        <CardEventElement>
          <span></span>
          <div>
            <div className='log-text'>
              카드내에서 작업한 내용이 로그로 남는 공간입니다.
            </div>
            <div className='log-time'>01.26 03:41:02</div>
          </div>
        </CardEventElement>
        <CardEventElement>
          <span></span>
          <div>
            <div className='log-text'>사용자가 카드를 생성하였습니다.</div>
            <div className='log-time'>01.26 03:41:02</div>
          </div>
        </CardEventElement>
      </LogModalList>
    </CardEventContainer>
  );
};

export default CardEventLog;

const CardEventContainer = styled.div`
  padding: 1px 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 0 rgba(9, 30, 66, 0.25);
  margin-top: 15px;
`;
const CardEventActivity = styled(LogType)`
  margin: 10px 0px;
`;
const CardEventList = styled(LogModalList)``;

const CardEventElement = styled(LogElement)`
  margin: 10px 0px;
  font-size: 14px;
  span {
    margin: 0px 10px;
  }
`;
