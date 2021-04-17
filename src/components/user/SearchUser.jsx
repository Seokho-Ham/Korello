import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchButtonModal from './SearchButtonModal';

const SearchUser = () => {
  const [searchedWord, setSearchedWord] = useState('');
  const [searchButtonHandler, setSearchButtonHandler] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const onClickHandler = () => {
    setSearchButtonHandler(!searchButtonHandler);
  };
  const onChangeHandler = e => {
    setSearchedWord(e.target.value);
  };
  const pageClickEvent = e => {
    if (
      dropdownRef.current !== null &&
      !dropdownRef.current.contains(e.target)
    ) {
      onClickHandler();
    }
  };
  useEffect(() => {
    if (searchButtonHandler) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [searchButtonHandler]);

  useEffect(() => {
    if (searchButtonHandler) inputRef.current.focus();
  }, [searchButtonHandler]);

  return (
    <>
      <SearchButtonContainer ref={dropdownRef} display={searchButtonHandler}>
        <input
          ref={inputRef}
          value={searchedWord}
          onChange={onChangeHandler}
          placeholder='아이디를 입력하세요'
        />
        <SearchButtonModal
          searchedWord={searchedWord}
          searchButtonHandler={searchButtonHandler}
        />
      </SearchButtonContainer>

      <SearchButton display={searchButtonHandler} onClick={onClickHandler}>
        Search
      </SearchButton>
    </>
  );
};

export default SearchUser;

const SearchButtonContainer = styled.div`
  display: ${props => (props.display ? 'block' : 'none')};
  input {
    margin: 2px 0px 0px 3px;
    width: 250px;
    height: 23px;
  }
  button {
    margin: 2px 0px 0px 3px;
  }
`;
const SearchButton = styled.button`
  display: ${props => (props.display ? 'none' : 'block')};
  background-color: hsla(0, 0%, 100%, 0.3);
  border: 0px;
  padding: 5px;
  margin: 0px;
  margin-left: 3px;

  font-weight: bold;
  color: #fff;
  :hover {
    opacity: 0.5;
  }
`;
