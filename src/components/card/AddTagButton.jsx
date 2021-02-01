import React, { useState } from 'react';
import { getRefreshToken, usePostApi } from '../../api/index';

const AddTagButton = ({ url, setUpdate }) => {
  const [tagName, setTagName] = useState('');
  const [cardName, setCardName] = useState('');
  const [clicked, setClicked] = useState(false);
  const [postData] = usePostApi();

  const onClickHandler = () => {
    setTagName('');
    setCardName('');
    setClicked(prevState => !prevState);
  };
  const onChangeHandler = e => {
    setTagName(e.target.value);
  };
  const onCardChangeHandler = e => {
    setCardName(e.target.value);
  };

  const addTag = async e => {
    e.preventDefault();
    if (tagName.length === 0 || cardName.length === 0) {
      alert('빈칸이 있습니다.');
    } else {
      const code = await postData(`${url.slice(0, url.length - 1)}`, {
        tagValue: tagName,
        name: cardName,
      });
      if (code === 201) {
        onClickHandler();
        setUpdate(prevState => !prevState);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addTag();
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
            placeholder='tag name'
            value={tagName}
            onChange={onChangeHandler}
          />
          <input
            placeholder='card name'
            value={cardName}
            onChange={onCardChangeHandler}
          />

          <button className='tag-add-bt'>Add</button>
        </form>
        <button className='tag-add-bt' onClick={onClickHandler}>
          Cancel
        </button>
      </div>
      <div
        className='tag-add-button'
        style={{ display: clicked ? 'none' : 'inline-block' }}
      >
        <button className='tag-add-bt' onClick={onClickHandler}>
          Add Tag
        </button>
      </div>
    </>
  );
};

export default AddTagButton;
