import React, { useState } from 'react';
import { getRefreshToken } from '../../api';
import postData from '../../api/postAPI';
const ChecklistModal = ({ id, setUpdate }) => {
  const [clicked, setClicked] = useState(false);
  const [checkListTitle, setCheckListTitle] = useState('');
  // const [postData] = usePostApi();

  const clickButton = () => {
    setClicked(p => !p);
  };
  const onChangeHandler = e => {
    setCheckListTitle(e.target.value);
  };
  const addCheckList = async e => {
    e.preventDefault();
    if (checkListTitle.length > 0) {
      const code = await postData(`/card/${id}/todo`, {
        cardId: id,
        title: checkListTitle,
      });
      if (code === 201 || code === 200) {
        setUpdate(p => !p);
        setCheckListTitle('');
        setClicked(p => !p);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCheckList();
      } else {
        alert('체크리스트 생성 실패');
        setUpdate(p => !p);
      }
    } else {
      alert('title을 입력해주세요.');
    }
  };

  return (
    <div className='add-checklist-modal'>
      <button onClick={clickButton}>CheckList</button>
      {clicked ? (
        <div className='checkList-modal' style={{ overflow: 'auto' }}>
          <form onSubmit={addCheckList}>
            <input
              placeholder='checklist title'
              value={checkListTitle}
              onChange={onChangeHandler}
              style={{ display: 'block' }}
            />
            <button>Add Checklist</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ChecklistModal;
