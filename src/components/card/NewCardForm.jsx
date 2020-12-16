import React, { useState } from 'react';

const NewCardForm = ({ setAddButton, cards }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const onChangeHandler = e => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  };
  const onClickHandler = () => {
    //서버에 데이터 전송
    if (title.length) {
      cards.push({
        id: cards[cards.length - 1].id + 1,
        title: title,
        description: description,
      });
    }

    setAddButton(prevState => !prevState);
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
