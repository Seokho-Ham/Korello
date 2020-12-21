import React, { memo, useState } from 'react';
import { usePostApi, useUpdateApi } from '../../api/index';

const CardListForm = ({ id, title, tag, url, setUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);

  const [postData] = usePostApi(url.slice(0, url.length - 1) + '/delete', {
    id: id,
  });
  const [updateData] = useUpdateApi(url.slice(0, url.length - 1) + '/name', {
    id: id,
    name: cardTitle,
  });

  const editCard = () => {
    setEdit(p => !p);
  };
  const inputHandler = e => {
    setCardTitle(e.target.value);
  };

  const sendUpdate = async () => {
    if (cardTitle !== title) {
      let code = await updateData();
      if (code === 200) {
        setEdit(p => !p);
        setUpdate(prevState => !prevState);
      } else {
        alert('update 실패');
      }
    } else {
      setEdit(p => !p);
    }
  };

  const deleteCard = async () => {
    let result_code = await postData();
    if (result_code === 201) {
      setUpdate(prevState => !prevState);
    } else {
      alert('삭제에 실패하였습니다.');
    }
  };

  const style = {
    backgroundColor: '#fff',
    borderRadius: '3px',
    margin: '20px',
    boxShadow: '0 2px 0 rgba(9,30,66,.25)',
  };

  return (
    <div style={style}>
      {edit ? (
        <span>
          <input value={cardTitle} onChange={inputHandler} />

          <button onClick={sendUpdate}>save</button>
        </span>
      ) : (
        <span>
          <h3
            style={{ marginLeft: '5px', display: 'inline' }}
            onClick={editCard}
          >
            {title}
          </h3>
        </span>
      )}

      <button style={{ float: 'right' }} onClick={deleteCard}>
        X
      </button>
      {/* <div style={{ marginLeft: '5px' }}>{description}</div> */}
    </div>
  );
};

export default memo(CardListForm);
