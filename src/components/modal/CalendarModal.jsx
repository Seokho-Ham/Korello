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
      !calendarRef.current.contains(e.target) &&
      !e.target.className.includes('react-datepicker')
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
    <Calendar>
      <CalendarButton onClick={onClickHandler}>Calendar</CalendarButton>

      <DateModal status={open} ref={calendarRef}>
        <SelectDate>
          <DatePicker
            locale='ko'
            selected={startDate}
            startDate={startDate}
            selectsStart
            endDate={endDate}
            onChange={onStartHandler}
            minDate={new Date()}
            dateFormat='yyyy.MM.dd(eee)'
          />
        </SelectDate>
        <span>~</span>
        <SelectDate>
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
