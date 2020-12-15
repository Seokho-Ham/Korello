import React, { useState } from 'react';

const BoardForm = props => {
  const { data, clickHandler } = props;

  return (
    <div
      style={{
        backgroundColor: data.color,
      }}
      onClick={e => {
        clickHandler(data.name);
      }}
    >
      <div>보드명 : {data.name}</div>
      <div>보드 타입 : {data.type}</div>
    </div>
  );
};

export default BoardForm;
