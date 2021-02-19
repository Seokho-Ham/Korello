import React from 'react';
import colors from '../../assets/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, postData } from '../../api';
import { getCard } from '../../containers/CardContainer';

const LabelList = ({ selectButton, labels }) => {
  const { labellist, currentBoardUrl, currentCardId } = useSelector(
    state => state.card,
  );
  const dispatch = useDispatch();
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
      ? await postData(`/card/${currentCardId}/label/delete`, {
          labelIds: [e.target.id],
        })
      : await postData(`/card/${currentCardId}/label`, {
          labelId: e.target.id,
        });
    console.log(code);
    if (code === 201 || code === 200) {
      getCard(currentBoardUrl, dispatch);
    } else if (code >= 401001) {
      await getRefreshToken();
      await addCardLabelButton(e);
    } else {
      alert('실패');
    }
  };

  const renderLabelList = () => {
    let colorlist = {};
    labellist.forEach(el => {
      colorlist[el.color] = labellist.indexOf(el);
    });

    return colors.map((el, i) => {
      if (colorlist[el.color] !== undefined) {
        let value = labellist[colorlist[el.color]];

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

  return <>{renderLabelList()}</>;
};

export default LabelList;
