import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, postData } from '../../api';
import styled from 'styled-components';
import LabelElement from './LabelElement';
import { setData } from '../../reducers/card.reducer';
import { updateCardEvents } from '../card/card_utils';

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
  const {
    labellist,
    currentCardId,
    cardeventlogs,
    cardlabels,
    axiosStatus,
  } = useSelector(state => state.card);

  const dispatch = useDispatch();

  const addCardLabelButton = async e => {
    if (!axiosStatus) {
      dispatch(setData({ axiosStatus: true }));
      let status = checkOverlap(cardlabels[currentCardId], e.target.id);
      const [responseData, code] = status
        ? await postData(`/card/${currentCardId}/label/delete`, {
            labelIds: [e.target.id],
          })
        : await postData(`/card/${currentCardId}/label`, {
            labelId: e.target.id,
          });

      if (code === 201 || code === 200) {
        let obj = { ...cardlabels };
        if (status) {
          obj[currentCardId].forEach((el, i) => {
            if (el.id === e.target.id) {
              obj[currentCardId].splice(i, 1);
            }
          });
        } else {
          labellist.forEach(el => {
            if (el.id === e.target.id) {
              if (!obj[currentCardId]) {
                obj[currentCardId] = [el];
              } else {
                obj[currentCardId].push(el);
              }
            }
          });
        }

        const logs = await updateCardEvents(currentCardId, cardeventlogs);
        dispatch(
          setData({ cardlabels: obj, axiosStatus: false, cardeventlogs: logs }),
        );
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCardLabelButton(e);
      } else {
        alert('실패');
        dispatch(setData({ axiosStatus: false }));
      }
    }
  };

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

export default memo(LabelList);
const LabelWrapper = styled.div`
  max-height: 300px;
  overflow-y: scroll;
`;
const LabelListWrapper = styled.div`
  display: flex;
`;
