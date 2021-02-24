import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, fetchData, updateData, deleteData } from '../../api';
import { setData } from '../../reducers/card.reducer';
import styled from 'styled-components';

const ChecklistElement = ({ el }) => {
  const [newTitle, setNewTitle] = useState(el.title);
  const [changeButton, setChangebutton] = useState(false);
  const { currentCardId } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const onChangeTitle = e => {
    setNewTitle(e.target.value);
  };

  const checkboxHandler = async e => {
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
  };
  const changeChecklist = async e => {
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
  };
  const deleteCheckList = async () => {
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
              <input value={newTitle} onChange={onChangeTitle} />
              <button>수정</button>
            </form>
          </CheckListTitle>
        ) : (
          <CheckListTitle onClick={changeChecklist}>{el.title}</CheckListTitle>
        )}
        <button onClick={deleteCheckList}>X</button>
      </>
    </CheckListItem>
  );
};

export default ChecklistElement;

const CheckListItem = styled.div`
  margin-bottom: 10px;
`;
const CheckListTitle = styled.span`
  display: inline-block;
  width: 395px;
  margin-left: 10px;
`;
