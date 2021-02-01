import React, { useState } from 'react';
import { usePostApi, useGetApi, getRefreshToken } from '../../api/index';
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
    setSelectColor(e.target.getAttribute('name'));
  };
  const handleDisplay = () => {
    setLabelName('');
    setSelectColor('');
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

  const addBoardLabelButton = async e => {
    e.preventDefault();
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
      } else if (code >= 401001) {
        await getRefreshToken();
        await addBoardLabelButton();
      } else {
        alert('추가 실패');
      }
    } else {
      alert('이름과 색을 정해주세요!');
    }
  };

  const checkOverlap = (arr, id) => {
    let result = false;
    arr.forEach(el => {
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
    } else if (code >= 401001) {
      await getRefreshToken();
      await addCardLabelButton();
    } else {
      alert('실패');
      setUpdate(p => !p);
    }
  };

  const newRenderColors = () => {
    let colorlist = {};
    data.forEach(el => {
      colorlist[el.color] = data.indexOf(el);
    });

    return colors.map((el, i) => {
      if (colorlist[el.color] !== undefined) {
        let value = data[colorlist[el.color]];

        return (
          <div className='label-list' key={i}>
            <span
              id={value.id}
              className='label-el'
              name={value.color}
              style={{
                backgroundColor: value.color,
              }}
              onClick={addCardLabelButton}
            >
              {value.name}
            </span>
          </div>
        );
      } else {
        return (
          <div className='label-list' key={i}>
            <span
              className='label-el-colors'
              name={el.color}
              style={{
                backgroundColor: el.color,
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
        <div className='label-modal'>
          {newRenderColors()}
          <div
            className='label-form'
            style={{ display: display ? 'block' : 'none' }}
          >
            <form onSubmit={addBoardLabelButton}>
              <input
                className='label-input-title'
                value={labelName}
                onChange={onChangeHandler}
                style={{
                  backgroundColor: selectColor,

                  color: selectColor === '' ? 'black' : '#fff',
                }}
                placeholder='title'
              />
              <button>Add Label</button>
            </form>
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
