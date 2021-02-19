import React, { useState } from 'react';
import { fetchData, postData, getRefreshToken } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../reducers/card.reducer';
import LabelList from './LabelList';

const Label = ({ labels }) => {
  const [openLabel, setOpenLabel] = useState(false);
  const [selectColor, setSelectColor] = useState('');
  const [labelName, setLabelName] = useState('');
  const [display, setDisplay] = useState(false);
  const { currentBoardUrl } = useSelector(state => state.card);
  const dispatch = useDispatch();

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

  const addBoardLabelButton = async e => {
    e.preventDefault();
    if (labelName.length > 0 && selectColor.length > 0) {
      const code = await postData(
        currentBoardUrl.slice(0, currentBoardUrl.length - 6) + '/label',
        {
          name: labelName,
          color: selectColor,
        },
      );

      if (code === 201) {
        setSelectColor('');
        setLabelName('');
        setDisplay(p => !p);
        let [labels] = await fetchData(
          currentBoardUrl.slice(0, currentBoardUrl.length - 6) + '/label',
        );
        dispatch(setData({ labellist: labels ? labels : [] }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await addBoardLabelButton(e);
      } else {
        alert('추가 실패');
      }
    } else {
      alert('이름과 색을 정해주세요!');
    }
  };

  return (
    <div className='add-card-label-button'>
      <button onClick={openLabelButton}>Label</button>
      {openLabel ? (
        <div className='label-modal'>
          <LabelList selectButton={selectButton} labels={labels} />
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
