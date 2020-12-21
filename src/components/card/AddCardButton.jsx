import React, { useState } from 'react';
import { usePostApi } from '../../api/index';

const AddButton = ({ addButton, setAddButton, tag, url, setUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postData] = usePostApi(`${url.slice(0, url.length - 1)}`, {
    tagValue: tag,
    name: title,
  });

  const onChangeHandler = e => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  };

  const onClickHandler = () => {
    setAddButton(prevState => !prevState);
  };

  const addCardHandler = async () => {
    if (title.length > 0) {
      const code = await postData();
      console.log(code);
      if (code === 201) {
        setUpdate(prevState => !prevState);
        setAddButton(prevState => !prevState);
      } else {
        alert('생성에 실패했습니다.');
        setTitle('');
      }
    } else {
      setAddButton(prevState => !prevState);
    }
  };

  return addButton ? (
    <>
      <div id='new-card-form' style={{ margin: '20px' }}>
        <input
          name='title'
          type='text'
          placeholder='title'
          value={title}
          onChange={onChangeHandler}
          style={{ width: '98%' }}
        ></input>
        <br></br>
        <input
          name='description'
          type='text'
          placeholder='description'
          value={description}
          onChange={onChangeHandler}
          style={{ width: '98%' }}
        ></input>
      </div>
      <div className='add-button'>
        <button onClick={addCardHandler}>Add Card</button>
      </div>
    </>
  ) : (
    <div className='add-button'>
      <button onClick={onClickHandler}>Add another card</button>
    </div>
  );
};

export default AddButton;
