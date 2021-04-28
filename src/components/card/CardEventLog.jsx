import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LogType, LogElement, LogModalList } from './BoardLogModal';
import { MdAccountCircle } from 'react-icons/md';

const CardEventLog = () => {
  const { cardEventLogs, currentCardId } = useSelector(state => state.card);

  const renderEventLogs = () => {
    return cardEventLogs[currentCardId].map(el => {
      let eventTime = `${el.createdDate[0]}.0${el.createdDate[1]}.${el.createdDate[2]} ${el.createdDate[3]}:${el.createdDate[4]}`;
      return (
        <CardEventElement key={el.id}>
          <MdAccountCircle size='32' />
          <div>
            <div className='log-text'>
              {el.memberName}님이 {el.message}
            </div>
            <div className='log-time'>{eventTime}</div>
          </div>
        </CardEventElement>
      );
    });
  };
  return (
    <CardEventContainer>
      <CardEventActivity>
        <h4>Activity</h4>
      </CardEventActivity>
      <CardEventList>
        {cardEventLogs[currentCardId] ? renderEventLogs() : null}
      </CardEventList>
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
  min-height: 100px;
`;
const CardEventActivity = styled(LogType)`
  margin: 10px 0px;
`;
const CardEventList = styled(LogModalList)``;

const CardEventElement = styled(LogElement)`
  font-size: 14px;
  svg {
    margin: 0px 10px 0px 0px;
  }
`;
