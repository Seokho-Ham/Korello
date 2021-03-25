import React, { useState } from 'react';
import styled from 'styled-components';
import { updateData, getRefreshToken } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { getCard } from '../card/card_utils';

const LabelElement = ({ id, name, color, onClick }) => {
  const [editLabel, setEditLabel] = useState(false);
  const [labelInput, setLabelInput] = useState(name);
  const { currentBoardUrl, currentBoardId } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const onEditLabelClick = () => {
    setEditLabel(p => !p);
  };
  const onInputChange = e => {
    setLabelInput(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (labelInput === name || labelInput === '') {
      onEditLabelClick();
    } else {
      const code = await updateData(`/label/${id}`, {
        color: color,
        name: labelInput,
      });

      if (code === 200 || code === 201) {
        setLabelInput('');
        onEditLabelClick();
        getCard(currentBoardUrl, dispatch, currentBoardId);
      } else if (code >= 401001) {
        await getRefreshToken();
        await onSubmit(e);
      } else {
        alert('실패');
      }
    }
  };

  return (
    <>
      <EditForm onSubmit={onSubmit} editLabel={editLabel}>
        <LabelElementInput
          placeholder={name}
          color={color}
          value={labelInput}
          onChange={onInputChange}
        />
      </EditForm>
      <LabelElementWrapper
        id={id}
        name={color}
        color={color}
        onClick={onClick}
        editLabel={editLabel}
      >
        {name}
      </LabelElementWrapper>
      <SendUpdateButton onClick={onSubmit} editLabel={editLabel}>
        Save
      </SendUpdateButton>
      <CancelButton onClick={onEditLabelClick} editLabel={editLabel}>
        Cancel
      </CancelButton>
      <LabelEditButton onClick={onEditLabelClick} editLabel={editLabel} />
    </>
  );
};

export default LabelElement;

const LabelElementWrapper = styled.span`
  color: #fff;
  /* display: inline-block; */
  display: ${props => (props.editLabel ? 'none' : 'inline-block')};
  font-size: 14px;
  margin: 2px;
  width: 85%;
  height: 25px;
  padding: 3px;
  line-height: 25px;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${props => props.color};
  :hover {
    opacity: 0.7;
  }
`;

const LabelElementInput = styled.input`
  color: #fff;
  display: inline-block;
  margin: 2px;
  width: 95%;
  height: 25px;
  padding: 3px;
  border: 0px;
  border-radius: 3px;
  background-color: ${props => props.color};
  box-shadow: inset 0 0 0 2px #0079bf;
`;
const LabelEditButton = styled.span`
  display: ${props => (props.editLabel ? 'none' : 'inline')};
  background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/pencil.png');
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: center;
  width: 15%;
  height: 33px;
  border-radius: 3px;
  border: 0;
  opacity: 0.7;
  :hover {
    opacity: 1;
    background-color: #e2e2e2;
  }
`;
export const SendUpdateButton = styled.button`
  display: ${props => (props.editLabel ? 'inline' : 'none')};
  background-color: #5aac44;
  height: 30px;
  border: 0;
  color: #fff;
  border-radius: 3px;
  &:hover {
    opacity: 0.8;
  }
`;
const CancelButton = styled.button`
  display: ${props => (props.editLabel ? 'inline' : 'none')};
  background-color: rgb(136, 137, 138);
  height: 30px;
  border: 0;
  color: #fff;
  margin-left: 0px;
  border-radius: 3px;
  &:hover {
    opacity: 0.8;
  }
`;

const EditForm = styled.form`
  display: ${props => (props.editLabel ? 'inline' : 'none')};
  margin: 0px;
  width: 75%;
`;
