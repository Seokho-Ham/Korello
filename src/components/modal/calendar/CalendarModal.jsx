import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import '../../../css/react-datepicker.css';
import { updateData, getRefreshToken, deleteData } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { updateCardEvents } from '../../../helper/card';
import { setCardData } from '../../../reducers/card.reducer';

const CalendarModal = ({ due }) => {
  const {
    cardlist,
    cardEventLogs,
    currentTagName,
    currentBoardId,
    currentCardId,
  } = useSelector(state => state.card);
  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const onDueDateHandler = date => {
    setDueDate(date);
  };
  const onClickHandler = () => {
    setOpen(!open);
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

  const sendDateHandler = async () => {
    if (window.confirm('해당 날짜로 DueDate를 설정하시겠습니까?')) {
      const [responseData, code] = await updateData(
        `/board/${currentBoardId}/card/due-date`,
        {
          id: currentCardId,
          dueDate: format(dueDate, 'yyyy-MM-dd kk:mm'),
        },
      );

      if (code === 200) {
        alert('DueDate 설정 완료!');
        const logs = await updateCardEvents(currentCardId, cardEventLogs);
        const list = { ...cardlist };
        list[currentTagName].filter(el => el.id === currentCardId)[0].dueDate =
          format(dueDate, 'yyyy-MM-dd kk:mm:ss');
        dispatch(setCardData({ cardlist: list, cardEventLogs: logs }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await sendDateHandler();
      } else {
        alert('생성에 실패했습니다.');
      }
    }
  };
  const dateDeleteHandler = async () => {
    if (window.confirm('DueDate를 제거하시겠습니까?')) {
      const code = await deleteData(
        `/board/${currentBoardId}/card/${currentCardId}/due-date`,
      );
      if (code === 200) {
        alert('DueDate 삭제 완료!');
        const logs = await updateCardEvents(currentCardId, cardEventLogs);
        const list = { ...cardlist };
        list[currentTagName].filter(el => el.id === currentCardId)[0].dueDate =
          null;
        dispatch(setCardData({ cardlist: list, cardEventLogs: logs }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await dateDeleteHandler();
      } else {
        alert('삭제에 실패했습니다.');
      }
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

  return (
    <Calendar ref={calendarRef}>
      <CalendarButton onClick={onClickHandler}>Calendar</CalendarButton>
      {open && (
        <DateModal>
          <SelectDate>
            <DatePicker
              selected={dueDate}
              showTimeSelect
              endDate={dueDate}
              minDate={dueDate}
              filterTime={filterPassedTime}
              dateFormat='yyyy-MM-dd kk:mm'
              onChange={onDueDateHandler}
            />
          </SelectDate>
          <span>
            <DateSaveButton onClick={sendDateHandler}>Save</DateSaveButton>
            {due && (
              <DateCancelButton onClick={dateDeleteHandler}>
                Delete
              </DateCancelButton>
            )}
          </span>
        </DateModal>
      )}
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
  min-width: 280px;
  width: 280px;
  display: block;
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
    background-color: #61d341;
  }
`;

const DateCancelButton = styled.button`
  background-color: #cf513d;
  color: #fff;
  height: 30px;
  border: 0;
  border-radius: 3px;
  &:hover {
    background-color: #e2472f;
  }
`;
