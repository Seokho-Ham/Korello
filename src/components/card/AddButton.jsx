import React, { useState } from 'react';

const AddButton = ({ addButton, setAddButton }) => {
  const onClickHandler = () => {
    setAddButton(prevState => !prevState);
  };
  return addButton ? null : (
    <button onClick={onClickHandler}>Add another card</button>
  );
};

export default AddButton;
