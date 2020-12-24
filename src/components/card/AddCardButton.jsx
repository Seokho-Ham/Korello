import React, { useState } from 'react';
import { usePostApi } from '../../api/index';

const AddButton = ({ addButton, setAddButton, tag, url, setUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postData] = usePostApi();

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
      const code = await postData(`${url.slice(0, url.length - 1)}`, {
        tagValue: tag,
        name: title,
      });

      if (code === 201) {
        setTitle('');
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
      <div className='new-card-form'>
        <input
          name='title'
          type='text'
          placeholder='title'
          value={title}
          onChange={onChangeHandler}
        ></input>
        {/* <br></br> */}
        {/* <input
          name='description'
          type='text'
          placeholder='description'
          value={description}
          onChange={onChangeHandler}
        ></input> */}
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
