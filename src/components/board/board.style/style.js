import styled from 'styled-components';
import workspace from '../../../assets/img/workspace.png';
import recent from '../../../assets/img/recent.png';
export const Board = styled.div`
  background-color: #f9fafc;
  margin: 40px 15px 0px;
  width: 100%;
  max-width: 860px;
  min-width: 288px;
`;

export const ListType = styled.div`
  position: relative;
  left: 18px;
  h3 {
    display: inline-block;
    line-height: 24px;
    margin: 0px 0 0;
    font-size: 16px;
    font-weight: 700;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span {
    background-image: url(${props =>
      props.name === 'workspace' ? workspace : recent});
    background-repeat: no-repeat;
    background-size: ${props => (props.name === 'workspace' ? '25px' : '27px')};
    width: 35px;
    height: 25px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 288px;
  width: 860px;
  max-height: 700px;
  overflow: auto;
`;

export const BoardElement = styled.div`
  margin: 10px;
  margin-top: 20px;
  float: left;
  width: 193px;
  height: 96px;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: 200px 100px;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
`;
