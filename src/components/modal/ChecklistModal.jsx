import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, getRefreshToken } from '../../api';
import postData from '../../api/postAPI';
import { setData } from '../../reducers/card.reducer';

const ChecklistModal = () => {
  const [clicked, setClicked] = useState(false);
  const [checkListTitle, setCheckListTitle] = useState('');
  const { currentCardId } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const clickButton = () => {
    setClicked(p => !p);
  };
  const onChangeHandler = e => {
    setCheckListTitle(e.target.value);
  };
  const addCheckList = async e => {
    e.preventDefault();
    if (checkListTitle.length > 0) {
      const code = await postData(`/card/${currentCardId}/todo`, {
        cardId: currentCardId,
        title: checkListTitle,
      });
      if (code === 201 || code === 200) {
        setCheckListTitle('');
        setClicked(p => !p);
        const [checklist] = await fetchData(`/card/${currentCardId}/todo`);
        dispatch(setData({ checklist: checklist ? checklist : [] }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCheckList(e);
      } else {
        alert('체크리스트 생성 실패');
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
