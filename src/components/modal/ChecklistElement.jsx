import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, fetchData, updateData, deleteData } from '../../api';
import { setData } from '../../reducers/card.reducer';
import styled from 'styled-components';
import deleteImage from '../../assets/img/cancel-icon.png';
const ChecklistElement = ({ el }) => {
  const [newTitle, setNewTitle] = useState(el.title);
  const [changeButton, setChangebutton] = useState(false);
  const { currentCardId, checklist } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const onChangeTitle = useCallback(
    e => {
      setNewTitle(e.target.value);
    },
    [newTitle],
  );

  const checkboxHandler = useCallback(
    async e => {
      const code = await updateData(`/todo/${e.target.name}/status`);
      if (code === 200) {
        const [checklist] = await fetchData(`/card/${currentCardId}/todo`);
        dispatch(setData({ checklist: checklist ? checklist : [] }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await checkboxHandler(e);
      } else {
        alert('실패');
      }
    },
    [checklist],
  );
  const changeChecklist = useCallback(
    async e => {
      e.preventDefault();
      if (changeButton) {
        if (newTitle.length > 0 && newTitle !== el.title) {
          const code = await updateData(`/todo/${el.todoId}`, {
            title: newTitle,
          });

          if (code === 200) {
            setChangebutton(false);
            const [checklist] = await fetchData(`/card/${currentCardId}/todo`);
            dispatch(setData({ checklist: checklist ? checklist : [] }));
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
    },
    [checklist],
  );
  const deleteCheckList = useCallback(async () => {
    const code = await deleteData(`/todo/${el.todoId}`);
    if (code === 200) {
      const [checklist] = await fetchData(`/card/${currentCardId}/todo`);
      dispatch(setData({ checklist: checklist ? checklist : [] }));
    } else if (code >= 401001) {
      await getRefreshToken();
      await deleteCheckList();
    } else {
      alert('실패');
    }
  }, [checklist]);

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
              <ChecklistUpdate>Save</ChecklistUpdate>
            </form>
          </CheckListTitle>
        ) : (
          <CheckListTitle onClick={changeChecklist}>{el.title}</CheckListTitle>
        )}
        <ChecklistDeleteButton
          onClick={deleteCheckList}
        ></ChecklistDeleteButton>
      </>
    </CheckListItem>
  );
};

export default ChecklistElement;

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
`;
const ChecklistDeleteButton = styled.span`
  display: inline-block;
  background-image: url(${deleteImage});
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
