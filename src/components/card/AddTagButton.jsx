import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, getRefreshToken, postData } from '../../api';
import { setFirebaseData } from '../../firebase';
import { setData } from '../../reducers/card.reducer';

const AddTagButton = () => {
  const [tagName, setTagName] = useState('');
  const [visibility, setVisibility] = useState(false);
  const { taglist, currentBoardId } = useSelector(state => state.card);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const buttonStatusHandler = () => {
    setTagName('');
    setVisibility(prevState => !prevState);
  };

  const onChangeHandler = e => {
    setTagName(e.target.value);
  };

  const pageClickEvent = e => {
    if (formRef.current !== null && !formRef.current.contains(e.target)) {
      setVisibility(!visibility);
    }
  };

  const addTag = async e => {
    e.preventDefault();
    if (!tagName) {
      alert('빈칸이 있습니다.');
      inputRef.current.focus();
    } else {
      await setFirebaseData(currentBoardId, {
        [tagName]: { name: tagName, createdAt: new Date() },
      });
      buttonStatusHandler();
      let arr = [...taglist];
      arr.push(tagName);
      dispatch(setData({ taglist: arr }));
    }
  };
  useEffect(() => {
    if (visibility) inputRef.current.focus();
  }, [visibility]);

  useEffect(() => {
    if (visibility) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [visibility]);
  return (
    <>
      <TagAddContainer clicked={visibility}>
        {visibility ? (
          <TagAddForm ref={formRef}>
            <form onSubmit={addTag}>
              <TagAddInput
                placeholder='tag name'
                value={tagName}
                onChange={onChangeHandler}
                ref={inputRef}
              />
              <TagAddButton>Add</TagAddButton>
            </form>
            <TagCancelButton onClick={buttonStatusHandler}>
              Cancel
            </TagCancelButton>
          </TagAddForm>
        ) : (
          <TagAddStateButton onClick={buttonStatusHandler}>
            + Add Another Tag
          </TagAddStateButton>
        )}
      </TagAddContainer>
    </>
  );
};

export default AddTagButton;

const TagAddContainer = styled.div`
  width: 272px;
  margin: 10px 10px;
  box-sizing: border-box;
  display: inline-block;
  background-color: ${props => (props.clicked ? '#ebecf0' : '')};
  border-radius: 4px;
`;
const TagAddInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  border: 0.5px;
  margin-bottom: 3px;
  background-color: hsla(0, 0%, 100%, 0.5);
  box-shadow: inset 0 0 0 2px #0079bf;
  padding: 5px;
`;
const TagAddForm = styled.div`
  box-sizing: border-box;
  margin: 7px;
`;
const TagAddButton = styled.button`
  margin: 2px;
  background-color: #5aac44;
  color: #fff;
  padding: 6px;
  border-radius: 6px;
  border: 1px;
  &:hover {
    background-color: #458534;
  }
`;
const TagCancelButton = styled.button`
  display: inline-block;
  background-color: #ebecf0;
  border: 0px;
  margin: 4px;
  padding: 6px;
  color: #172b4d;
  &:hover {
    background-color: hsla(0, 0%, 74%, 0.5);
  }
`;
const TagAddStateButton = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 3px;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  border-radius: 3px;
  margin: 3px;
  text-align: center;
  cursor: pointer;
  background-color: hsla(0, 0%, 100%, 0.24);
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.5);
  }
`;
