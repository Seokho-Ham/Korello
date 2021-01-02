import React, { useState } from 'react';
import { usePostApi } from '../../api';

const ChecklistModal = ({ id, setUpdate }) => {
  const [clicked, setClicked] = useState(false);
  const [checkListTitle, setCheckListTitle] = useState('');
  const [postData] = usePostApi();

  const clickButton = () => {
    setClicked(p => !p);
  };
  const onChangeHandler = e => {
    setCheckListTitle(e.target.value);
  };
  const addCheckList = async () => {
    const code = await postData(`/card/${id}/todo`, {
      cardId: id,
      title: checkListTitle,
    });
    if (code === 201 || code === 200) {
      setUpdate(p => !p);
      setCheckListTitle('');
      setClicked(p => !p);
    } else {
      alert('체크리스트 생성 실패');
      setUpdate(p => !p);
    }
  };

  return (
    <div>
      <button onClick={clickButton}>CheckList</button>
      {clicked ? (
        <div className='checkList-modal' style={{ overflow: 'auto' }}>
          <input
            placeholder='checklist title'
            value={checkListTitle}
            onChange={onChangeHandler}
            style={{ display: 'block' }}
          />
          <button onClick={addCheckList}>Add Checklist</button>
        </div>
      ) : null}
    </div>
  );
};

export default ChecklistModal;
