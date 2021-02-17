import React, { memo } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';
import { useUpdateApi, getRefreshToken } from '../../api/index';
// import { useDrop } from 'react-dnd';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const TagForm = ({ data, tag, boardUrl, setUpdate, tagIndex }) => {
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
                        setUpdate={setUpdate}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <AddCardButton tag={tag} url={boardUrl} setUpdate={setUpdate} />
      </div>
    </div>
  );
};

export default memo(TagForm);
