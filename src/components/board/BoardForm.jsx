import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
const BoardForm = props => {
  const { id, url, data } = props;
  const history = useHistory();
  const onClickHandler = () => history.push(`${url}/${data.id}`, { id: id });
  return (
    <div
      // style={{
      //   backgroundColor: data.color,
      // }}
      id='board-element'
      onClick={onClickHandler}
    >
      <>보드명 : {data.name}</>
      <>보드 생성시간 : {data.createDate}</>
    </div>
  );
};

export default BoardForm;
