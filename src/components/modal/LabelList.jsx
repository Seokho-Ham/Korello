import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, postData } from '../../api';
import { getCard } from '../card/card_utils';
import styled from 'styled-components';
import LabelElement from './LabelElement';

const checkOverlap = (arr, id) => {
  const ids = arr.map(el => el.id);
  if (ids.includes(id)) {
    return true;
  }
  return false;
};

const LabelList = ({ labels }) => {
  const { labellist, currentBoardUrl, currentCardId } = useSelector(
    state => state.card,
  );
  const dispatch = useDispatch();

  const addCardLabelButton = useCallback(
    async e => {
      let status = checkOverlap(labels, e.target.id);
      const code = status
        ? await postData(`/card/${currentCardId}/label/delete`, {
            labelIds: [e.target.id],
          })
        : await postData(`/card/${currentCardId}/label`, {
            labelId: e.target.id,
          });

      if (code === 201 || code === 200) {
        getCard(currentBoardUrl, dispatch);
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
        <LabelListWrapper key={i}>
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

  return <>{renderLabelList()}</>;
};

export default LabelList;

const LabelListWrapper = styled.div`
  display: flex;
`;
