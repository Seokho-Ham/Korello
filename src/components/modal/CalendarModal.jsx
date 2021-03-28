import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import '../../css/react-datepicker.css';
import { postData, getRefreshToken } from '../../api';

const CalendarModal = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), new Date().getHours()),
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 0), new Date().getHours()),
  );
  const calendarRef = useRef(null);

  const onStartHandler = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    console.log(
      `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
      }${day} ${hour}:${minute}`,
    );
    setStartDate(date);
  };
  const onEndHandler = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    console.log(
      `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
      }${day} ${hour}:${minute}`,
    );
    setEndDate(date);
  };
  const onClickHandler = () => {
    setOpen(p => !p);
  };

  const pageClickEvent = e => {
    if (
      calendarRef.current !== null &&
      !calendarRef.current.contains(e.target) &&
      !e.target.className.includes('react-datepicker')
    ) {
      setOpen(!open);
    }
  };
  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const sendDateHandler = async () => {};

  useEffect(() => {
    if (open) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [open]);

  return (
    <Calendar>
      <CalendarButton onClick={onClickHandler}>Calendar</CalendarButton>

      <DateModal status={open} ref={calendarRef}>
        <SelectDate>
          <DatePicker
            selected={startDate}
            startDate={startDate}
            selectsStart
            showTimeSelect
            endDate={endDate}
            onChange={onStartHandler}
            filterTime={filterPassedTime}
            minDate={new Date()}
            dateFormat='yyyy/MM/dd h:mm aa'
          />
        </SelectDate>
        <span>~</span>
        <SelectDate>
          <DatePicker
            selected={endDate}
            selectsEnd
            showTimeSelect
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            filterTime={filterPassedTime}
            dateFormat='yyyy/MM/dd h:mm aa'
            onChange={onEndHandler}
          />
        </SelectDate>
        <div>
          <DateSaveButton onClick={onClickHandler}>저장</DateSaveButton>
          <DateCancelButton onClick={onClickHandler}>취소</DateCancelButton>
        </div>
      </DateModal>
    </Calendar>
  );
};

export default CalendarModal;

const Calendar = styled.div`
  margin: 2px 0px;
`;
const CalendarButton = styled.button`
  background-color: rgba(9, 30, 66, 0.08);
  width: 98%;
  height: 30px;
  border: 0;
  color: #172b4d;
  &:hover {
    background-color: hsla(0, 0%, 74%, 0.5);
  }
`;
const DateModal = styled.div`
  min-width: 328px;
  width: 328px;
  display: ${props => (props.status ? 'block' : 'none')};
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 3px;
  margin: 1px auto;
  padding: 25px 8px;
`;

const SelectDate = styled.span`
  display: inline-block;
  width: auto;
`;

const DateSaveButton = styled.button`
  background-color: #5aac44;
  height: 30px;
  border: 0;
  color: #fff;
  border-radius: 3px;
  &:hover {
    opacity: 0.5;
    background-color: #5aac44;
  }
`;

const DateCancelButton = styled.button`
  background-color: rgba(9, 30, 66, 0.08);
  height: 30px;
  border: 0;
  border-radius: 3px;
  :hover {
    opacity: 0.5;
  }
`;
