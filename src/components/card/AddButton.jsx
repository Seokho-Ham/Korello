import React, { useState } from 'react';

const AddButton = ({ addButton, setAddButton }) => {
  const onClickHandler = () => {
    setAddButton(prevState => !prevState);
  };
  return addButton ? null : (
    <div className='add-button'>
      <button onClick={onClickHandler}>Add another card</button>
    </div>
  );
};

export default AddButton;
