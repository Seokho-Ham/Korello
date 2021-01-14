import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePostApi, useGetApi } from '../../api/index';
import colors from '../../assets/colors';

const Label = ({ id, url, modalUpdate, setModalUpdate, setUpdate, labels }) => {
  const [openLabel, setOpenLabel] = useState(false);
  const [selectColor, setSelectColor] = useState('');
  const [labelName, setLabelName] = useState('');
  const [display, setDisplay] = useState(false);
  const [postData] = usePostApi();
  const [data] = useGetApi(
    'get',
    url.slice(0, url.length - 6) + '/label',
    modalUpdate,
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
  const handleDisplay = () => {
    setDisplay(p => !p);
  };

  const deleteLabel = async e => {
    // console.log(e.target.name);
    // console.log(url);
    // const code = await postData(
    //   url.slice(0, url.length - 6) + '/label/delete',
    //   {
    //     labelsIds: e.target.name,
    //   },
    // );
    // if (code === 200) {
    //   setSelectColor('');
    //   setLabelName('');
    // } else {
    //   alert('삭제 실패');
    // }
  };

  const addBoardLabelButton = async () => {
    if (labelName.length > 0 && selectColor.length > 0) {
      const code = await postData(url.slice(0, url.length - 6) + '/label', {
        name: labelName,
        color: selectColor,
      });

      if (code === 201) {
        setSelectColor('');
        setLabelName('');
        setDisplay(p => !p);
        setModalUpdate(p => !p);
      } else {
        alert('추가 실패');
      }
    } else {
      alert('이름과 색을 정해주세요!');
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

  const newRenderColors = () => {
    let colorlist = {};
    data.map(el => {
      colorlist[el.color] = data.indexOf(el);
    });

    return colors.map((el, i) => {
      if (colorlist[el.color] !== undefined) {
        let value = data[colorlist[el.color]];

        return (
          <div
            key={i}
            style={{
              display: 'flex',
            }}
          >
            <span
              // key={i}
              id={value.id}
              className={value.color}
              style={{
                backgroundColor: value.color,
                color: '#fff',
                display: 'block',
                // float: 'left',
                margin: '2px',
                width: '160px',
                height: '20px',
                padding: '3px',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
              onClick={addCardLabelButton}
            >
              {value.name}
              <a
                name={value.id}
                onClick={deleteLabel}
                style={{ float: 'right' }}
              >
                X
              </a>
            </span>
          </div>
        );
      } else {
        return (
          <div key={i} style={{ display: 'flex' }}>
            <span
              // key={i}
              className={el.color}
              style={{
                backgroundColor: el.color,
                color: '#fff',
                display: 'inline-block',
                margin: '1px',
                padding: '3px',
                width: '160px',
                height: '20px',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
              onClick={selectButton}
            ></span>
          </div>
        );
      }
    });
  };
  return (
    <div className='add-card-label-button'>
      <button onClick={openLabelButton}>Label</button>
      {openLabel ? (
        <div className='label-modal' style={{ overflow: 'auto' }}>
          {newRenderColors()}
          <div
            className='label-form'
            style={{ display: display ? 'block' : 'none' }}
          >
            <input
              value={labelName}
              onChange={onChangeHandler}
              style={{
                backgroundColor: selectColor,
                width: '160px',
                borderRadius: '3px',
                color: selectColor === '' ? 'black' : '#fff',
              }}
              placeholder='title'
            />
            <button onClick={addBoardLabelButton}>Add Label</button>
            <button onClick={handleDisplay}>Cancel</button>
          </div>

          <button
            onClick={handleDisplay}
            style={{ display: display ? 'none' : 'block' }}
          >
            Add Label
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Label;
