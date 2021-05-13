import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { MdSchedule } from 'react-icons/md';

const DueDateComponent = ({ dueDate, expiredStatus }) => {
  return (
    dueDate && (
      <>
        <ModalDueDate expired={expiredStatus}>
          <MdSchedule
            size='30'
            style={{
              margin: '0px 3px',
              position: 'relative',
              bottom: '3px',
            }}
          />
          <div className='dueDate'>
            {`${format(new Date(dueDate), 'M월 d일 kk시 mm분')}`}
            {expiredStatus && ' - 기간 만료!'}
          </div>
        </ModalDueDate>
      </>
    )
  );
};
const ModalDueDate = styled.div`
  display: block;
  background-color: ${props => (props.expired ? '#e2472f' : '#febebe')};
  margin: 10px 0px;
  padding-top: 5px;
  width: ${props => (props.expired ? '235px' : '170px')};
  height: 30px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;

  .dueDate {
    margin: 0px;
    display: inline-block;
    position: relative;
    bottom: 11px;
  }
`;
export default DueDateComponent;
