import React, { memo } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';
import { getRefreshToken } from '../../api/index';
import updateData from '../../api/updateAPI';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { fetchCard } from '../../containers/CardContainer';
import { Draggable, Droppable } from 'react-beautiful-dnd';
const TagForm = ({ data, tag, boardUrl }) => {
  const dispatch = useDispatch();

  // const appendItem = async item => {
  //   if (item.tagValue !== tag) {
  //     const code = await updateData(
  //       boardUrl.slice(0, boardUrl.length - 1) + '/tag',
  //       {
  //         id: item.id,
  //         tagValue: tag,
  //       },
  //     );
  //     if (code === 200) {
  //       fetchCard(boardUrl, dispatch);
  //     } else if (code >= 401001) {
  //       await getRefreshToken();
  //       await appendItem(item);
  //     } else {
  //       alert('이동 실패');
  //     }
  //   }
  // };

  // const [{ hovered }, drop] = useDrop({
  //   accept: 'card',
  //   drop: appendItem,
  //   collect: monitor => {
  //     return {
  //       hovered: monitor.isOver(),
  //     };
  //   },
  // });
  // const [updateData] = useUpdateApi();

  // const updateCard = async item => {
  //   if (item.tagValue !== tag) {
  //     const code = await updateData(
  //       boardUrl.slice(0, boardUrl.length - 1) + '/tag',
  //       {
  //         id: item.id,
  //         tagValue: tag,
  //       },
  //     );
  //     if (code === 200) {
  //       setUpdate(p => !p);
  //     } else if (code >= 401001) {
  //       await getRefreshToken();
  //       await updateCard();
  //     } else {
  //       alert('이동 실패');
  //     }
  //   }
  // };
  // console.log(boardUrl.slice(0, boardUrl.length - 1));

  return (
    <div className='tag-wrapper'>
      <div className='tag'>
        <div className='tag-header'>{tag}</div>
        <Droppable droppableId={tag}>
          {provided => {
            return (
              <div
                className={tag}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data
                  .sort((a, b) => a.id - b.id)
                  .map((el, i) => {
                    return (
                      <CardListForm
                        key={el.id}
                        index={i}
                        id={el.id}
                        title={el.name}
                        memberNames={el.memberNames}
                        labels={el.labels}
                        tag={tag}
                        url={boardUrl}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <AddCardButton tag={tag} url={boardUrl} />
      </div>
    </div>
  );
};

export default memo(TagForm);
