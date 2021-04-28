import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getRefreshToken, postData } from '../../api';
import { setCardData } from '../../reducers/card.reducer';

const SearchButtonModal = ({ searchedWord, searchButtonHandler }) => {
  const { userList } = useSelector(state => state.user);
  const { currentBoardId, memberlist } = useSelector(state => state.card);
  const [currentUserName, setCurrentUserName] = useState('');
  const dispatch = useDispatch();
  const userAuthorityHandler = async e => {
    const status = e.target.name;
    if (
      window.confirm(
        `${currentUserName}님을 현재 보드목록에${
          e.target.name === 'join'
            ? ' 초대하시겠습니까?'
            : '서 제거하시겠습니까?'
        }`,
      )
    ) {
      let userData = userList.filter(el => {
        if (el.name === currentUserName) {
          return el.id;
        }
      })[0];

      const [responseData, code] = await postData(
        `/board/${currentBoardId}/member/${status}`,
        {
          memberId: userData.id,
          boardId: currentBoardId,
        },
      );
      if (code === 201 || code === 200) {
        setCurrentUserName('');
        let arr = [...memberlist];

        if (status === 'join') {
          let data = { memberId: userData.id, memberName: userData.name };
          arr.push(data);
        } else {
          arr.forEach((el, i) => {
            if (el.memberId === userData.id) {
              arr.splice(i, 1);
            }
          });
        }
        dispatch(setCardData({ memberlist: arr }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await userAuthorityHandler(e);
      } else {
        console.log(code);
      }
    }
  };

  const renderUsers = () => {
    let memberNames = memberlist.map(el => {
      return el.memberName;
    });

    if (searchedWord.length > 0) {
      return userList.map((el, i) => {
        if (el.name.includes(searchedWord)) {
          return (
            <UserElement
              key={i}
              onMouseOver={() => {
                setCurrentUserName(el.name);
              }}
            >
              <UserName>{el.name}</UserName>
              {memberNames.includes(el.name) ? (
                <KickButton onClick={userAuthorityHandler} name='exit'>
                  Kick Board
                </KickButton>
              ) : (
                <JoinButton onClick={userAuthorityHandler} name='join'>
                  Join Board
                </JoinButton>
              )}
            </UserElement>
          );
        }
      });
    } else {
      return userList.map((el, i) => {
        return (
          <UserElement
            key={i}
            onMouseOver={() => {
              setCurrentUserName(el.name);
            }}
          >
            <UserName>{el.name}</UserName>
            {memberNames.includes(el.name) ? (
              <KickButton onClick={userAuthorityHandler} name='exit'>
                Kick Board
              </KickButton>
            ) : (
              <JoinButton onClick={userAuthorityHandler} name='join'>
                Join Board
              </JoinButton>
            )}
          </UserElement>
        );
      });
    }
  };

  return searchButtonHandler ? (
    <SearchModalContainer className='search-modal'>
      <div style={{ fontWeight: 'bold' }}>User List</div>
      <hr />
      <SearchModalList>
        {userList && memberlist ? renderUsers() : null}
      </SearchModalList>
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
