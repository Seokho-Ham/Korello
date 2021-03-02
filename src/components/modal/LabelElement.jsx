import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import editImage from '../../assets/img/pencil.png';
import { updateData, getRefreshToken, postData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { getCard } from '../card/card_utils';

const LabelElement = ({ id, name, color, onClick }) => {
  const [editLabel, setEditLabel] = useState(false);
  const [labelInput, setLabelInput] = useState(name);
  const { currentBoardUrl } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const onEditLabelClick = useCallback(() => {
    setEditLabel(p => !p);
  }, [editLabel]);
  const onInputChange = useCallback(
    e => {
      setLabelInput(e.target.value);
    },
    [labelInput],
  );

  const onSubmit = useCallback(
    async e => {
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
          getCard(currentBoardUrl, dispatch);
        } else if (code >= 401001) {
          await getRefreshToken();
          await onSubmit(e);
        } else {
          alert('실패');
        }
      }
    },
    [labelInput],
  );

  return (
    <>
      {editLabel ? (
        <EditForm onSubmit={onSubmit}>
          <LabelElementInput
            placeholder={name}
            color={color}
            value={labelInput}
            onChange={onInputChange}
          />
        </EditForm>
      ) : (
        <LabelElementWrapper
          id={id}
          name={color}
          color={color}
          onClick={onClick}
        >
          {name}
        </LabelElementWrapper>
      )}
      {editLabel ? (
        <>
          <SendUpdateButton onClick={onSubmit}>Save</SendUpdateButton>
          <CancelButton onClick={onEditLabelClick}>Cancel</CancelButton>
        </>
      ) : (
        <LabelEditButton onClick={onEditLabelClick} />
      )}
    </>
  );
};

export default LabelElement;

const LabelElementWrapper = styled.span`
  color: #fff;
  display: inline-block;
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
  background-image: url(${editImage});
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
  margin: 0px;
  width: 75%;
`;
