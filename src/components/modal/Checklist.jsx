import React, { useState } from 'react';
import ChecklistElement from './ChecklistElement';
import { postData, fetchData, getRefreshToken } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../reducers/card.reducer';

const Checklist = ({ percent }) => {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState('');
  const { checklist, currentCardId } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const clickButtonHandler = () => {
    setClicked(p => !p);
  };

  const addChecklistHandler = async e => {
    e.preventDefault();
    if (title.length > 0) {
      const code = await postData(`/card/${currentCardId}/todo`, {
        cardId: currentCardId,
        title: title,
      });
      if (code === 201 || code === 200) {
        setTitle('');
        setClicked(p => !p);
        const [checklist] = await fetchData(`/card/${currentCardId}/todo`);
        dispatch(setData({ checklist: checklist ? checklist : [] }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await addChecklistHandler(e);
      } else {
        alert('생성 실패!');
      }
    } else {
      alert('title을 입력해주세요');
    }
  };
  const onChangeHandler = e => {
    setTitle(e.target.value);
  };
  return (
    <>
      <div className='checklist-header'>
        <h4 style={{ margin: '0px 0px 5px 0px' }}>CheckList</h4>
        <div className='progress-container'>
          <div className='progress-percent'>{percent}%</div>
          <div className='progress-bar'>
            <div
              className='progress-percent-bar'
              style={{
                width: `${percent}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='checklist- inner'>
        {checklist.map((el, i) => (
          <ChecklistElement key={i} el={el} />
        ))}
      </div>
      <div className='checklist-add-button'>
        {clicked ? (
          <>
            <form onSubmit={addChecklistHandler}>
              <input
                placeholder='title'
                value={title}
                onChange={onChangeHandler}
              ></input>
              <button>Add</button>
            </form>
            <button onClick={clickButtonHandler}>Cancel</button>
          </>
        ) : (
          <button onClick={clickButtonHandler}>Add an item</button>
        )}
      </div>
    </>
  );
};

export default Checklist;
