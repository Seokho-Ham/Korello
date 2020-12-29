import React, { useState } from 'react';
import { usePostApi, useGetApi } from '../../api/index';
import colors from '../../assets/colors';

const Label = ({ id, url, setUpdate, labels }) => {
  const [openLabel, setOpenLabel] = useState(false);
  const [selectColor, setSelectColor] = useState('');
  const [labelName, setLabelName] = useState('');
  const [addButton, setAddButton] = useState(false);
  const [postData] = usePostApi();
  const [data] = useGetApi(
    'get',
    url.slice(0, url.length - 6) + '/label',
    addButton,
  );

  const onChangeHandler = e => {
    setLabelName(e.target.value);
  };
  const openLabelButton = () => {
    setOpenLabel(p => !p);
  };
  const selectButton = e => {
    setSelectColor(e.target.className);
  };

  const addBoardLabelButton = async () => {
    if (addButton & (labelName.length > 0)) {
      const code = await postData(url.slice(0, url.length - 6) + '/label', {
        name: labelName,
        color: selectColor,
      });

      if (code === 201) {
        setSelectColor('');
        setLabelName('');
        setAddButton(p => !p);
      } else {
        alert('추가 실패');
      }
    } else {
      setAddButton(p => !p);
    }
  };

  const checkOverlap = (arr, id) => {
    let result = false;
    arr.map(el => {
      if (el.id === id) {
        result = true;
      }
    });
    return result;
  };

  const addCardLabelButton = async e => {
    const code = checkOverlap(labels, e.target.id)
      ? await postData(`/card/${id}/label/delete`, {
          labelIds: [e.target.id],
        })
      : await postData(`/card/${id}/label`, {
          labelId: e.target.id,
        });

    if (code === 201 || code === 200) {
      setUpdate(p => !p);
    } else {
      alert('실패');
      setUpdate(p => !p);
    }
  };

  return (
    <div className='add-card-label-button'>
      <button onClick={openLabelButton}>Label</button>
      {openLabel ? (
        <div className='label-modal' style={{ overflow: 'auto' }}>
          {data.length > 0 && !addButton
            ? data.map((el, i) => (
                <span
                  key={i}
                  id={el.id}
                  className={el.color}
                  style={{
                    backgroundColor: el.color,
                    display: 'block',
                    margin: '2px',
                    padding: '3px',
                    cursor: 'pointer',
                  }}
                  onClick={addCardLabelButton}
                >
                  {el.name}
                </span>
              ))
            : null}
          {addButton ? (
            <>
              {colors.map((el, i) => (
                <span
                  key={i}
                  className={el.color}
                  style={{
                    backgroundColor: el.color,
                    float: 'left',
                    width: '48px',
                    height: '32px',
                    margin: '2px',
                    padding: '1px, 2px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={selectButton}
                ></span>
              ))}
              <input
                value={labelName}
                onChange={onChangeHandler}
                style={{ display: 'block' }}
              />
              <div
                style={{
                  backgroundColor: selectColor,
                  borderRadius: '4px',
                  margin: '2px',
                }}
              >
                selected color
              </div>
            </>
          ) : null}

          <button onClick={addBoardLabelButton}>Add Label</button>
        </div>
      ) : null}
    </div>
  );
};

export default Label;
