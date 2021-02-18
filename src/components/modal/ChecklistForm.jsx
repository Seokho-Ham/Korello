import React, { useState } from 'react';
import { getRefreshToken } from '../../api/index';
import updateData from '../../api/updateAPI';
import deleteData from '../../api/deleteAPI';
const ChecklistForm = ({ el, setUpdate }) => {
  const [newTitle, setNewTitle] = useState(el.title);
  const [changeButton, setChangebutton] = useState(false);
  const onChangeTitle = e => {
    setNewTitle(e.target.value);
  };
  const checkboxHandler = async e => {
    const code = await updateData(`/todo/${e.target.name}/status`);
    if (code === 200) {
      setUpdate(p => !p);
    } else if (code >= 401001) {
      await getRefreshToken();
      await checkboxHandler();
    } else {
      alert('실패');
      setUpdate(p => !p);
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
          setUpdate(p => !p);
        } else if (code >= 401001) {
          await getRefreshToken();
          await changeChecklist();
        } else {
          alert('실패');
          setUpdate(p => !p);
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
      setUpdate(p => !p);
    } else if (code >= 401001) {
      await getRefreshToken();
      await deleteCheckList();
    } else {
      alert('실패');
      setUpdate(p => !p);
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

export default ChecklistForm;
