import React, { useState } from 'react';
import { usePostApi, getRefreshToken } from '../../api/index';

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

  const addCardHandler = async e => {
    e.preventDefault();
    if (title.length > 0) {
      const code = await postData(`${url.slice(0, url.length - 1)}`, {
        tagValue: tag,
        name: title,
      });

      if (code === 201) {
        setTitle('');
        setDisplay(prevState => !prevState);
        setUpdate(prevState => !prevState);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCardHandler();
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
        <button onClick={onClickHandler}>Cancel</button>
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
