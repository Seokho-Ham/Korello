import React, { memo, useState } from 'react';
import { usePostApi, useUpdateApi } from '../../api/index';
import { useDrag } from 'react-dnd';
import CardModal from './CardModal';

const CardListForm = ({ id, title, tag, url, setUpdate }) => {
  const [collectedProps, drag] = useDrag({
    item: { id: id, tagValue: tag, type: 'card' },
  });
  const [edit, setEdit] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const [modalVisible, setModalVisible] = useState(false);
  const [postData] = usePostApi();
  const [updateData] = useUpdateApi();

  const editCard = () => {
    setEdit(p => !p);
  };
  const inputHandler = e => {
    setCardTitle(e.target.value);
  };

  const clickModal = () => {
    setModalVisible(p => !p);
  };

  const sendUpdate = async () => {
    if (cardTitle !== title) {
      let code = await updateData(url.slice(0, url.length - 1) + '/name', {
        id: id,
        name: cardTitle,
      });
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
    let result_code = await postData(url.slice(0, url.length - 1) + '/delete', {
      id: id,
    });
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
    <div style={style} ref={edit ? null : drag}>
      {modalVisible ? (
        <CardModal visible={modalVisible} onClose={clickModal} />
      ) : null}

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

      <button className='modal' onClick={clickModal}>
        modal
      </button>

      <button style={{ float: 'right' }} onClick={deleteCard}>
        X
      </button>

      {/* <div style={{ marginLeft: '5px' }}>{description}</div> */}
    </div>
  );
};

export default memo(CardListForm);
