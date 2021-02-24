import React, { useState } from 'react';
import { fetchData, postData, getRefreshToken } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../reducers/card.reducer';
import LabelList from './LabelList';
import styled from 'styled-components';
import { SendUpdateButton } from './LabelElement';
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
    <LabelModalWrapper>
      <LabelButton onClick={openLabelButton}>Label</LabelButton>
      {openLabel ? (
        <LabelModal>
          <LabelList selectButton={selectButton} labels={labels} />
          {display ? (
            <div>
              <form onSubmit={addBoardLabelButton}>
                <LabelInputTitle
                  value={labelName}
                  onChange={onChangeHandler}
                  placeholder='title'
                  color={selectColor}
                />
                <AddLabelButton>Add Label</AddLabelButton>
              </form>
              <LabelButton onClick={handleDisplay}>Cancel</LabelButton>
            </div>
          ) : (
            <LabelButton onClick={handleDisplay}>Add Label</LabelButton>
          )}
        </LabelModal>
      ) : null}
    </LabelModalWrapper>
  );
};

export default Label;

const LabelModalWrapper = styled.div`
  margin: 2px 0px;
`;

const LabelModal = styled.div`
  min-width: 270px;
  display: block;
  position: relative;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 3px;
  top: 50%;
  left: 3px;
  margin: 1px auto;
  padding: 25px 8px;
`;
const LabelButton = styled.button`
  background-color: rgba(9, 30, 66, 0.04);
  width: 98%;
  height: 30px;
  border: 0;
  color: #172b4d;
  &:hover {
    background-color: hsla(0, 0%, 74%, 0.5);
  }
`;
const LabelInputTitle = styled.input`
  border-radius: 3px;
  display: inline-block;
  margin: 2px;
  width: 96%;
  height: 25px;
  padding: 3px;
  border: 0px;
  border-radius: 3px;
  background-color: ${props => props.color};
  box-shadow: inset 0 0 0 2px #0079bf;
  color: ${props => (props.color === '' ? 'black' : '#fff')};
`;
const AddLabelButton = styled(SendUpdateButton)`
  width: 98%;
`;
