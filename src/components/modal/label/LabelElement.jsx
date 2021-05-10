import React, { useState } from 'react';
import styled from 'styled-components';
import {
  deleteData,
  updateData,
  getRefreshToken,
  fetchEvents,
} from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setCardData } from '../../../reducers/card.reducer';

const LabelElement = ({ id, name, color, onClick }) => {
  const [editLabel, setEditLabel] = useState(false);
  const [labelInput, setLabelInput] = useState(name);
  const {
    cardlabels,
    boardlabels,
    currentBoardId,
    currentCardId,
  } = useSelector(state => state.card);
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
      const [resultData, code] = await updateData(`/label/${id}`, {
        color: color,
        name: labelInput,
      });

      if (code === 200 || code === 201) {
        onEditLabelClick();
        let list = [...boardlabels];
        list.forEach(el => {
          if (el.id === id) {
            el.name = labelInput;
          }
        });
        dispatch(setCardData({ boardlabels: list }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await onSubmit(e);
      } else {
        alert('실패');
      }
    }
  };

  const deleteBoardLabel = async () => {
    if (window.confirm('라벨을 완전히 삭제하시겠습니까?')) {
      const code = await deleteData(`/board/${currentBoardId}/label/${id}`);
      if (code === 200) {
        let overlap = true;
        cardlabels[currentCardId].forEach(el => {
          if (el.id === id) {
            overlap = false;
          }
        });
        if (!overlap) {
          let obj = cardlabels;
          obj[currentCardId].forEach((el, i) => {
            if (el.id === id) {
              obj[currentCardId].splice(i, 1);
            }
          });
          const [boardEventLogs] = await fetchEvents(
            `/events/board/${currentBoardId}`,
          );

          dispatch(
            setCardData({
              cardlabels: obj,
              boardlabels: boardlabels.filter(el => el.id !== id),
              boardEventLogs,
            }),
          );
        } else {
          dispatch(
            setCardData({
              boardlabels: boardlabels.filter(el => el.id !== id),
            }),
          );
        }
      } else if (code >= 401001) {
        await getRefreshToken();
        await deleteBoardLabel();
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
      <CancelButton onClick={deleteBoardLabel} editLabel={editLabel}>
        Delete
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
  background-color: #cf513d;
  height: 30px;
  border: 0;
  color: #fff;
  margin-left: 0px;
  border-radius: 3px;
  &:hover {
    /* opacity: 0.8; */
    background-color: #e2472f;
  }
`;

const EditForm = styled.form`
  display: ${props => (props.editLabel ? 'inline' : 'none')};
  margin: 0px;
  width: 75%;
`;
