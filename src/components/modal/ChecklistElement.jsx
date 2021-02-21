import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, fetchData, updateData, deleteData } from '../../api';
import { setData } from '../../reducers/card.reducer';

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
    <div className='checklist-item'>
      <>
        <input
          type='checkbox'
          name={el.todoId}
          checked={el.status}
          onChange={checkboxHandler}
        />
        {changeButton ? (
          <span className='checklist-item-title'>
            <form onSubmit={changeChecklist}>
              <input value={newTitle} onChange={onChangeTitle} />
              <button>수정</button>
            </form>
          </span>
        ) : (
          <span className='checklist-item-title' onClick={changeChecklist}>
            {el.title}
          </span>
        )}
        <button className='checklist-delete' onClick={deleteCheckList}>
          X
        </button>
      </>
    </div>
  );
};

export default ChecklistElement;
