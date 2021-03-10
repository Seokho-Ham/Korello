import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, postData } from '../../api';
import styled from 'styled-components';
import LabelElement from './LabelElement';
import { setData } from '../../reducers/card.reducer';

const checkOverlap = (arr, id) => {
  if (!arr) {
    return false;
  }
  const ids = arr.map(el => el.id);
  if (ids.includes(id)) {
    return true;
  }
  return false;
};

const LabelList = () => {
  const { labellist, currentCardId, cardlabels } = useSelector(
    state => state.card,
  );

  const dispatch = useDispatch();

  const addCardLabelButton = useCallback(
    async e => {
      let status = checkOverlap(cardlabels[currentCardId], e.target.id);
      const code = status
        ? await postData(`/card/${currentCardId}/label/delete`, {
            labelIds: [e.target.id],
          })
        : await postData(`/card/${currentCardId}/label`, {
            labelId: e.target.id,
          });

      if (code === 201 || code === 200) {
        let arr = cardlabels[currentCardId];
        if (status) {
          arr.forEach((el, i) => {
            if (el.id === e.target.id) {
              arr.splice(i, 1);
            }
          });
        } else {
          labellist.forEach(el => {
            if (el.id === e.target.id) {
              arr.push(el);
            }
          });
        }
        dispatch(setData({ [cardlabels[currentCardId]]: arr }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCardLabelButton(e);
      } else {
        alert('실패');
      }
    },
    [labellist],
  );

  const renderLabelList = () => {
    return labellist.map((el, i) => {
      return (
        <LabelListWrapper className='dasdas' key={i}>
          <LabelElement
            id={el.id}
            name={el.name}
            color={el.color}
            onClick={addCardLabelButton}
          />
        </LabelListWrapper>
      );
    });
  };

  return <LabelWrapper>{renderLabelList()}</LabelWrapper>;
};

export default LabelList;
const LabelWrapper = styled.div`
  max-height: 300px;
  overflow-y: scroll;
`;
const LabelListWrapper = styled.div`
  display: flex;
`;
