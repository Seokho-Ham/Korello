import React, { memo } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';
import { getRefreshToken } from '../../api/index';
import updateData from '../../api/updateAPI';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { fetchCard } from '../../containers/CardContainer';

const TagForm = ({ data, tag, boardUrl }) => {
  const dispatch = useDispatch();
  const appendItem = async item => {
    if (item.tagValue !== tag) {
      const code = await updateData(
        boardUrl.slice(0, boardUrl.length - 1) + '/tag',
        {
          id: item.id,
          tagValue: tag,
        },
      );
      if (code === 200) {
        fetchCard(boardUrl, dispatch);
      } else if (code >= 401001) {
        await getRefreshToken();
        await appendItem(item);
      } else {
        alert('이동 실패');
      }
    }
  };

  const [{ hovered }, drop] = useDrop({
    accept: 'card',
    drop: appendItem,
    collect: monitor => {
      return {
        hovered: monitor.isOver(),
      };
    },
  });

  return (
    <div className='tag-wrapper'>
      <div className='tag'>
        <div className='tag-header'>{tag}</div>
        <div
          className={`drop-area ${hovered ? 'drop-area-hovered' : ''}`}
          ref={drop}
        >
          {data
            .sort((a, b) => a.id - b.id)
            .map(el => {
              return (
                <CardListForm
                  key={el.id}
                  id={el.id}
                  title={el.name}
                  memberNames={el.memberNames}
                  labels={el.labels}
                  tag={tag}
                  url={boardUrl}
                />
              );
            })}
        </div>
        <AddCardButton tag={tag} url={boardUrl} />
      </div>
    </div>
  );
};

export default memo(TagForm);
