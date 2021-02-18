import React, { useEffect, useState } from 'react';
import Label from '../modal/Label';
import CheckListModal from '../modal/ChecklistModal';
import Checklist from '../modal/Checklist';
import CalendarModal from '../modal/CalendarModal';

import { fetchData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { getModal } from '../../reducers/card.reducer';

const CardModal = ({ onClose, id, title, tag, url, setUpdate, labels }) => {
  const [modalUpdate, setModalUpdate] = useState(false);
  const { modalList } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const progressCalculator = data => {
    let count = 0;
    data.forEach(el => {
      if (el.status) {
        count++;
      }
    });
    const result = Math.round((count / data.length) * 100);
    return result;
  };

  useEffect(() => {
    const fetchModal = async () => {
      const [data] = await fetchData(`/card/${id}/todo`);
      let payload = {
        modalList: data,
      };
      dispatch(getModal(payload));
    };
    fetchModal();
  }, []);
  return (
    <>
      <div className='modal-container' />
      <div className='modal-wrapper'>
        <div tabIndex='0' className='modal-inner'>
          <button className='modal-close' onClick={onClose}>
            X
          </button>
          <div className='modal-header'>
            <div className='modal-labels'>
              {labels.length > 0
                ? labels.map((el, i) => (
                    <span
                      key={i}
                      className='label'
                      style={{
                        backgroundColor: el.color,
                      }}
                    >
                      {el.name}
                    </span>
                  ))
                : null}
            </div>
            <h2>{title}</h2>
          </div>
          <div className='modal-contents'>
            {modalList.length > 0 ? (
              <div className='checklist-container'>
                <Checklist
                  id={id}
                  data={modalList}
                  setUpdate={setModalUpdate}
                  percent={progressCalculator(modalList)}
                />
              </div>
            ) : null}
          </div>
          <div className='modal-sidebar'>
            <Label
              url={url}
              id={id}
              modalUpdate={modalUpdate}
              setModalUpdate={setModalUpdate}
              // setUpdate={setUpdate}
              labels={labels}
            />
            <CheckListModal id={id} setUpdate={setModalUpdate} />
            <CalendarModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardModal;
