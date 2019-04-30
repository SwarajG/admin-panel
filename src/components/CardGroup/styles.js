import { css } from 'emotion';

const cardImage = (image) => css`
  background: url(${image}) center center no-repeat;
  background-size: cover;
  margin-left: -15px;
  width: 40px;
  height: 56px;
`;

const cardImageWrapper = css`
  position: relative;
  display: flex;
  margin-bottom: 20px;
  padding-left: 15px;
  margin-right: 20px;
`;

const groupName = (color) => css`
  position: absolute;
  bottom: 0;
  padding: 1px;
  text-align: center;
  background-color: ${color};
  color: #FFF;
  width: 100%;
  margin-left: -15px;
  font-size: 12px;
`;

export default {
  cardImage,
  cardImageWrapper,
  groupName
};