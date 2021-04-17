import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const SearchButtonModal = ({ searchedWord, searchButtonHandler }) => {
  const { userList } = useSelector(state => state.user);

  const renderUsers = () => {
    if (searchedWord.length > 0) {
      return userList.map((el, i) => {
        if (el.name.includes(searchedWord)) {
          return (
            <UserElement key={i}>
              <UserName>{el.name}</UserName>
              <KickButton>Kick Board</KickButton>
              <JoinButton>Join Board</JoinButton>
            </UserElement>
          );
        }
      });
    } else {
      return userList.map((el, i) => {
        return (
          <UserElement key={i}>
            <UserName>{el.name}</UserName>
            <KickButton>Kick Board</KickButton>
            <JoinButton>Join Board</JoinButton>
          </UserElement>
        );
      });
    }
  };

  return searchButtonHandler ? (
    <SearchModalContainer className='search-modal'>
      <div style={{ fontWeight: 'bold' }}>User List</div>
      <hr />
      <SearchModalList>{renderUsers()}</SearchModalList>
    </SearchModalContainer>
  ) : null;
};

export default SearchButtonModal;

const SearchModalContainer = styled.div`
  min-width: 300px;
  display: block;
  position: absolute;
  top: 43px;
  left: 95px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 3px;
  margin-left: 5px;
  padding: 25px 8px;
  z-index: 22;
`;
const SearchModalList = styled.div`
  overflow: scroll;
  height: 90%;
  display: flex;
  flex-direction: column;
`;
const UserElement = styled.div`
  &:hover {
    div {
      color: goldenrod;
    }
  }
`;

const UserName = styled.div`
  float: left;
  height: 33px;
  text-align: center;
  border-radius: 4px;

  margin: 5px 0px;
`;

const JoinButton = styled.button`
  float: right;
  background-color: #5aac44;
  height: 30px;
  border: 0;
  color: #fff;
  border-radius: 3px;
  &:hover {
    opacity: 0.5;
    background-color: #5aac44;
  }
`;
const KickButton = styled.button`
  float: right;
  background-color: #e2472f;
  height: 30px;
  border: 0;
  color: #fff;
  border-radius: 3px;
  &:hover {
    opacity: 0.5;
    background-color: #e2472f;
  }
`;
