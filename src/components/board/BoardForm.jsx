import React from 'react';
import { useHistory } from 'react-router-dom';
const BoardForm = props => {
  const { url, data } = props;
  const history = useHistory();

  const onClickHandler = () =>
    history.push(`${url}/${data.id}`, { id: data.id });

  return (
    <>
      <div id='board-element' onClick={onClickHandler}>
        <>보드명 : {data.name}</>
      </div>
    </>
  );
};

export default BoardForm;
