import React, { useState } from 'react';
import { useUpdateApi } from '../../api/index';

const ChecklistForm = ({ el, setUpdate }) => {
  const [updateData] = useUpdateApi();
  const [newTitle, setNewTitle] = useState(el.title);
  const [changeButton, setChangebutton] = useState(false);
  const onChangeTitle = e => {
    setNewTitle(e.target.value);
  };
  const checkboxHandler = async e => {
    const code = await updateData(`/todo/${e.target.name}/status`);
    if (code === 200) {
      setUpdate(p => !p);
    } else {
      alert('실패');
      setUpdate(p => !p);
    }
  };
  const changeChecklist = async () => {
    if (changeButton) {
      if (newTitle.length > 0 && newTitle !== el.title) {
        const code = await updateData(`/todo/${el.todoId}`, {
          title: newTitle,
        });

        if (code === 200) {
          setChangebutton(false);
          setUpdate(p => !p);
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
  const deleteCheckList = async () => {};

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
            <input value={newTitle} onChange={onChangeTitle} />
            <button onClick={changeChecklist}>수정</button>
          </span>
        ) : (
          <span className='checklist-item-title' onClick={changeChecklist}>
            {el.title}
          </span>
        )}
      </>
    </div>
  );
};

export default ChecklistForm;
