import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import '../../css/react-datepicker.css';
import ko from 'date-fns/locale/ko';
const CalendarModal = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const calendarRef = useRef(null);
  const onStartHandler = date => {
    setStartDate(date);
  };
  const onEndHandler = date => {
    setEndDate(date);
  };
  const onClickHandler = () => {
    setOpen(p => !p);
  };

  const pageClickEvent = e => {
    if (
      calendarRef.current !== null &&
      !calendarRef.current.contains(e.target)
    ) {
      setOpen(!open);
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [open]);

  registerLocale('ko', ko);
  return (
    <Calendar >
      <CalendarButton onClick={onClickHandler}>Calendar</CalendarButton>
      
        <DateModal status={open}>
          <DatePicker
            locale='ko'
            selected={startDate}
            startDate={startDate}
            selectsStart
            endDate={endDate}
            onChange={onStartHandler}
            minDate={new Date()}
            dateFormat='yyyy.MM.dd(eee)'
            // shouldCloseOnSelect={false}
          />
          <DatePicker
            locale='ko'
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat='yyyy.MM.dd(eee)'
            onChange={onEndHandler}
          />
          <div>
            <DateSaveButton onClick={onClickHandler}>저장</DateSaveButton>
            <button onClick={onClickHandler}>취소</button>
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
  min-width: 270px;
  display: ${props =>props.status ?'block' : 'none'};
  position: absolute;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 3px;
  z-index: 20;
  margin: 1px auto;
  padding: 25px 8px;
`;

const DateSaveButton = styled.button`
  background-color: #5aac44;
  height: 30px;
  border: 0;
  color: #fff;
  border-radius: 3px;
  &:hover {
    opacity: 0.8;
    background-color: #5aac44;
  }
`;

const DateCancelButton = styled.button``;
