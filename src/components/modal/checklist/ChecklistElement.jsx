import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, updateData, deleteData } from '../../../api';
import { setCardData } from '../../../reducers/card.reducer';
import styled from 'styled-components';
import { updateCardEvents } from '../../../helper/card';

const ChecklistElement = ({ el }) => {
  const [newTitle, setNewTitle] = useState(el.title);
  const [changeButton, setChangebutton] = useState(false);
  const { currentCardId, checklist, cardEventLogs } = useSelector(
    state => state.card,
  );
  const dispatch = useDispatch();

  const onChangeTitle = e => {
    setNewTitle(e.target.value);
  };

  const checkboxHandler = async e => {
    const [resultData, code] = await updateData(
      `/todo/${e.target.name}/status`,
    );
    if (code === 200) {
      let obj = { ...checklist };
      obj[currentCardId].forEach(element => {
        if (element.todoId === el.todoId) {
          element.status = !element.status;
        }
      });
      const logs = await updateCardEvents(currentCardId, cardEventLogs);

      dispatch(setCardData({ checklist: obj, cardEventLogs: logs }));
    } else if (code >= 401001) {
      await getRefreshToken();
      await checkboxHandler(e);
    } else {
      alert('실패');
    }
  };
  const changeChecklist = async e => {
    e.preventDefault();
    if (changeButton) {
      if (newTitle.length > 0 && newTitle !== el.title) {
        const [resultData, code] = await updateData(`/todo/${el.todoId}`, {
          title: newTitle,
        });

        if (code === 200) {
          setChangebutton(false);
          let obj = { ...checklist };
          obj[currentCardId].forEach(element => {
            if (element.todoId === el.todoId) {
              element.title = newTitle;
            }
          });
          const logs = await updateCardEvents(currentCardId, cardEventLogs);
          dispatch(setCardData({ checklist: obj, cardEventLogs: logs }));
        } else if (code >= 401001) {
          await getRefreshToken();
          await changeChecklist(e);
        } else {
          alert('실패');
        }
      } else {
        setChangebutton(p => !p);
      }
    } else {
      setChangebutton(p => !p);
    }
  };

  const deleteCheckList = async () => {
    if (window.confirm('체크리스트를 삭제하시겠습니까?')) {
      const code = await deleteData(`/todo/${el.todoId}`);
      if (code === 200) {
        const logs = await updateCardEvents(currentCardId, cardEventLogs);
        let obj = { ...checklist };
        obj[currentCardId].forEach((element, i) => {
          if (element.todoId === el.todoId) {
            obj[currentCardId].splice(i, 1);
          }
        });
        dispatch(setCardData({ checklist: obj, cardEventLogs: logs }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await deleteCheckList();
      } else {
        alert('실패');
      }
    }
  };

  return (
    <CheckListItem>
      <>
        <input
          type='checkbox'
          name={el.todoId}
          checked={el.status}
          onChange={checkboxHandler}
        />
        {changeButton ? (
          <CheckListTitle>
            <form onSubmit={changeChecklist}>
              <ChecklistEdit value={newTitle} onChange={onChangeTitle} />
              <ChecklistUpdate onClick={changeChecklist}>Save</ChecklistUpdate>
            </form>
          </CheckListTitle>
        ) : (
          <CheckListTitle
            onClick={changeChecklist}
            className='title'
            checked={el.status}
          >
            {el.title}
          </CheckListTitle>
        )}
        <ChecklistDeleteButton
          onClick={deleteCheckList}
        ></ChecklistDeleteButton>
      </>
    </CheckListItem>
  );
};

export default React.memo(ChecklistElement);

const CheckListItem = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 3px;
  display: flex;
  flex-direction: row;
`;
const CheckListTitle = styled.span`
  display: inline-block;
  width: 395px;
  height: 30px;
  margin-left: 10px;

  text-decoration: ${props => props.checked && 'line-through'};
  color: ${props => props.checked && '#adb5bd'};
`;
const ChecklistDeleteButton = styled.span`
  display: inline-block;
  background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/cancel-icon.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 14px;
  width: 20px;
  height: 20px;
  padding: 3px;
  border-radius: 3px;
  :hover {
    opacity: 0.5px;
    background-color: #e2e2e2;
  }
`;
const ChecklistEdit = styled.input`
  box-shadow: inset 0 0 0 2px #0079bf;
  position: relative;
  bottom: 6px;
  height: 25px;
  margin: 0px;
  border: 0px;
  font-size: 16px;
`;

const ChecklistUpdate = styled.button`
  background-color: #5aac44;
  height: 30px;
  position: relative;
  margin: 0px 3px;
  bottom: 6px;
  border: 0;
  color: #fff;
  border-radius: 3px;
  &:hover {
    opacity: 0.8;
  }
`;
