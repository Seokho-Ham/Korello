import React, { useState } from 'react';
import { getRefreshToken, postData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { getCard } from '../../containers/CardContainer';

const AddButton = ({ tag }) => {
  const [title, setTitle] = useState('');
  const [display, setDisplay] = useState(false);
  const { currentBoardUrl } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const onChangeHandler = e => {
    setTitle(e.target.value);
  };

  const onClickHandler = () => {
    setDisplay(prevState => !prevState);
  };

  const addCardHandler = async e => {
    e.preventDefault();
    if (title.length > 0) {
      const code = await postData(
        `${currentBoardUrl.slice(0, currentBoardUrl.length - 1)}`,
        {
          tagValue: tag,
          name: title,
        },
      );

      if (code === 201) {
        setTitle('');
        setDisplay(prevState => !prevState);
        getCard(currentBoardUrl, dispatch);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCardHandler(e);
      } else {
        alert('생성에 실패했습니다.');
        setTitle('');
      }
    } else {
      alert('이름을 입력해주세요.');
    }
  };

  return (
    <>
      <div
        className='new-card-form'
        style={{ display: display ? 'block' : 'none' }}
      >
        <form onSubmit={addCardHandler}>
          <input
            name='title'
            type='text'
            placeholder='title'
            value={title}
            onChange={onChangeHandler}
          ></input>

          <button>Add Card</button>
        </form>
        <button className='cancel' onClick={onClickHandler}>
          X
        </button>
      </div>
      <div
        className='add-button'
        style={{ display: display ? 'none' : 'block' }}
      >
        <button onClick={onClickHandler}>+ Add another card</button>
      </div>
    </>
  );
};

export default AddButton;
