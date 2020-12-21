import React, { memo } from 'react';
import { usePostApi } from '../../api/index';

const CardListForm = ({ id, title, tag, url, setUpdate }) => {
  const [postData] = usePostApi(url.slice(0, url.length - 1) + '/delete', {
    id: id,
  });
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
      <h3 style={{ marginLeft: '5px', display: 'inline' }}>{title}</h3>
      <button style={{ float: 'right' }} onClick={deleteCard}>
        X
      </button>
      {/* <div style={{ marginLeft: '5px' }}>{description}</div> */}
    </div>
  );
};

export default memo(CardListForm);
