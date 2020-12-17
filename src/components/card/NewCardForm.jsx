import axios from 'axios';
import React, { useState } from 'react';
import apiHandler from '../../api/index';

const NewCardForm = ({ setAddButton, tag, url, setUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onChangeHandler = e => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  };

  const onClickHandler = async () => {
    const { result_code } = await apiHandler(
      'post',
      `${url.slice(0, url.length - 1)}`,
      {
        tagValue: tag,
        name: title,
      },
    );

    if (title.length === 0) {
      setAddButton(prevState => !prevState);
    } else {
      if (result_code === 201) {
        setUpdate(prevState => !prevState);
        setAddButton(prevState => !prevState);
      } else {
        alert('생성에 실패했습니다.');
        setTitle('');
      }
    }
  };

  return (
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
        <button onClick={onClickHandler}>Add Card</button>
      </div>
    </>
  );
};

export default NewCardForm;
