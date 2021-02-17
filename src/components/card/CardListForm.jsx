import React, { memo, useState } from 'react';
import { getRefreshToken } from '../../api/index';
import { useDrag } from 'react-dnd';
import CardModal from './CardModal';
import postData from '../../api/postAPI';
import { useDispatch } from 'react-redux';
import updateData from '../../api/updateAPI';
import { fetchCard } from '../../containers/CardContainer';
import { getModal } from '../../reducers/card.reducer';
import { Draggable, Droppable } from 'react-beautiful-dnd';
const CardListForm = ({ id, title, tag, memberNames, labels, url, index }) => {
  const [edit, setEdit] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const editCard = () => {
    setEdit(p => !p);
  };
  const inputHandler = e => {
    setCardTitle(e.target.value);
  };

  const clickModal = () => {
    setModalVisible(p => !p);

    let payload = {
      modalList: [],
    };
    dispatch(getModal(payload));
  };

  const sendUpdate = async e => {
    e.preventDefault();
    if (cardTitle !== title) {
      let code = await updateData(url.slice(0, url.length - 1) + '/name', {
        id: id,
        name: cardTitle,
      });
      if (code === 200) {
        setEdit(p => !p);
        fetchCard(url, dispatch);
      } else if (code >= 401001) {
        await getRefreshToken();
        await sendUpdate(e);
      } else {
        alert('update 실패');
      }
    } else {
      setEdit(p => !p);
    }
  };

  const deleteCard = async () => {
    console.log(id);
    let code = await postData(url.slice(0, url.length - 1) + '/delete', {
      id: id,
    });
    if (code === 201) {
      fetchCard(url, dispatch);
    } else if (code >= 401001) {
      await getRefreshToken();
      await deleteCard();
    } else {
      alert('삭제에 실패하였습니다.');
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {modalVisible ? (
              <CardModal
                onClose={clickModal}
                id={id}
                title={title}
                tag={tag}
                url={url}
                labels={labels}
              />
            ) : null}
            <div
              className='card'
              // opacity={isDragging ? 0.5 : 1}
              // ref={edit ? null : drag}
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
              ) : (
                <div className='card-labels'></div>
              )}
              {edit ? (
                <div className='card-input'>
                  <form onSubmit={sendUpdate}>
                    <input value={cardTitle} onChange={inputHandler} />
                    <button>save</button>
                  </form>
                </div>
              ) : (
                <div className='card-title' onClick={editCard}>
                  {title}
                </div>
              )}
              {edit ? null : (
                <div className='card-buttons'>
                  <button className='modal' onClick={clickModal}>
                    modal
                  </button>
                  <span
                    className='card-delete-button'
                    onClick={deleteCard}
                  ></span>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default memo(CardListForm);
