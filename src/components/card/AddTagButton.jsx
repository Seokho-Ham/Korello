import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, postData } from '../../api';
import { getCard } from '../../containers/CardContainer';

const AddTagButton = () => {
  const [tagName, setTagName] = useState('');
  const [cardName, setCardName] = useState('');
  const [clicked, setClicked] = useState(false);
  const { currentBoardUrl } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const buttonStatusHandler = () => {
    setTagName('');
    setCardName('');
    setClicked(prevState => !prevState);
  };
  const onChangeHandler = e => {
    e.target.name === 'tag'
      ? setTagName(e.target.value)
      : setCardName(e.target.value);
  };

  const addTag = async e => {
    e.preventDefault();
    if (!tagName || !cardName) {
      alert('빈칸이 있습니다.');
    } else {
      const code = await postData(
        `${currentBoardUrl.slice(0, currentBoardUrl.length - 1)}`,
        {
          tagValue: tagName,
          name: cardName,
        },
      );
      if (code === 201) {
        buttonStatusHandler();
        getCard(currentBoardUrl, dispatch);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addTag(e);
      } else {
        alert('생성에 실패했습니다.');
        setTagName('');
      }
    }
  };

  return (
    <>
      <div
        className='tag-add-button'
        style={{ display: clicked ? 'inline-block' : 'none' }}
      >
        <form onSubmit={addTag}>
          <input
            name='tag'
            placeholder='tag name'
            value={tagName}
            onChange={onChangeHandler}
          />
          <input
            name='card'
            placeholder='card name'
            value={cardName}
            onChange={onChangeHandler}
          />

          <button className='tag-add-bt'>Add</button>
        </form>
        <button className='tag-add-bt' onClick={buttonStatusHandler}>
          Cancel
        </button>
      </div>
      <div
        className='tag-add-button'
        style={{ display: clicked ? 'none' : 'inline-block' }}
      >
        <button className='tag-add-bt' onClick={buttonStatusHandler}>
          Add Tag
        </button>
      </div>
    </>
  );
};

export default AddTagButton;
