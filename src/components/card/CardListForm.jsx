import React, { memo, useState } from 'react';
import { usePostApi, useUpdateApi } from '../../api/index';
import { useDrag } from 'react-dnd';
import CardModal from './CardModal';

const CardListForm = ({
  id,
  title,
  tag,
  memberNames,
  labels,
  url,
  setUpdate,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id: id, tagValue: tag },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
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
    console.log(id);
    let result_code = await postData(url.slice(0, url.length - 1) + '/delete', {
      id: id,
    });
    if (result_code === 201) {
      setUpdate(prevState => !prevState);
    } else {
      alert('삭제에 실패하였습니다.');
      setUpdate(prevState => !prevState);
    }
  };

  return (
    <>
      {modalVisible ? (
        <CardModal
          onClose={clickModal}
          id={id}
          title={title}
          tag={tag}
          url={url}
          setUpdate={setUpdate}
          labels={labels}
        />
      ) : null}
      <div
        className='card'
        opacity={isDragging ? 0.5 : 1}
        ref={edit ? null : drag}
      >
        {labels.length > 0 ? (
          <div className='card-labels'>
            {labels
              .sort((a, b) => a.id - b.id)
              .map((el, i) => (
                <span
                  key={i}
                  className='label'
                  style={{
                    backgroundColor: el.color,
                  }}
                ></span>
              ))}
          </div>
        ) : null}
        {edit ? (
          <div className='card-input'>
            <input value={cardTitle} onChange={inputHandler} />
            <button onClick={sendUpdate}>save</button>
          </div>
        ) : (
          <div onClick={editCard}>{title}</div>
        )}
        {edit ? null : (
          <div className='card-buttons'>
            <button className='modal' onClick={clickModal}>
              modal
            </button>
            <button className='card-delete-button' onClick={deleteCard}>
              X
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(CardListForm);
