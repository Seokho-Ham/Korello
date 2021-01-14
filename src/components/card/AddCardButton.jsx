import React, { useState } from 'react';
import { usePostApi } from '../../api/index';

const AddButton = ({ tag, url, setUpdate }) => {
  const [title, setTitle] = useState('');
  const [display, setDisplay] = useState(false);
  const [postData] = usePostApi();

  const onChangeHandler = e => {
    setTitle(e.target.value);
  };

  const onClickHandler = () => {
    setDisplay(prevState => !prevState);
  };

  const addCardHandler = async () => {
    if (title.length > 0) {
      const code = await postData(`${url.slice(0, url.length - 1)}`, {
        tagValue: tag,
        name: title,
      });

      if (code === 201) {
        setTitle('');
        setDisplay(prevState => !prevState);
        setUpdate(prevState => !prevState);
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
        <input
          name='title'
          type='text'
          placeholder='title'
          value={title}
          onChange={onChangeHandler}
        ></input>
        <div className='add-button'>
          <button onClick={addCardHandler}>Add Card</button>
          <button onClick={onClickHandler}>Cancel</button>
        </div>
      </div>
      <div
        className='add-button'
        style={{ display: display ? 'none' : 'block' }}
      >
        <button onClick={onClickHandler}>Add another card</button>
      </div>
    </>
  );
};

export default AddButton;
