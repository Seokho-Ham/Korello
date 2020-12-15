import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const BoardForm = props => {
  const { url, data } = props;

  return (
    <Link to={`${url}/${data.type}`}>
      <div
        style={{
          backgroundColor: data.color,
        }}
      >
        <div>보드명 : {data.name}</div>
        <div>보드 타입 : {data.type}</div>
      </div>
    </Link>
  );
};

export default BoardForm;
