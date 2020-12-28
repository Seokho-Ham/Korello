import React, { useState } from 'react';
import { usePostApi } from '../../api/index';
import colors from '../../assets/colors';

const Label = ({ id, url }) => {
  const [labelClick, setLabelClick] = useState(false);
  const [selectColor, setSelectColor] = useState('');
  const [labelName, setLabelName] = useState('');
  const [postData] = usePostApi();

  const onChangeHandler = e => {
    setLabelName(e.target.value);
  };
  const clickButton = () => {
    setLabelClick(p => !p);
  };
  const selectButton = e => {
    setSelectColor(e.target.className);
  };
  const addLabelButton = async () => {
    //보드의 라벨을 만든다.
    const code = await postData(url.slice(0, url.length - 6) + '/label', {
      name: labelName,
      color: selectColor,
    });

    if (code === 201) {
      setSelectColor('');
      setLabelName('');
    } else {
      alert('추가 실패');
    }
  };

  return (
    <div className='add-card-label-button'>
      <button onClick={clickButton}>Label</button>
      {labelClick ? (
        <div className='label-modal'>
          {colors.map((el, i) => (
            <span
              key={i}
              className={el}
              style={{
                backgroundColor: el,
                display: 'block',
                margin: '2px',
              }}
              onClick={selectButton}
            >
              {el}
            </span>
          ))}
          <input value={labelName} onChange={onChangeHandler} />
          <button onClick={addLabelButton}>Add Label</button>
        </div>
      ) : null}
    </div>
  );
};

export default Label;
