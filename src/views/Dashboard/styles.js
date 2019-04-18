import { css } from 'emotion';

const cardTitle = css`
  height: 22px;
  color: rgba(0,0,0,.45);
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 10px;
`;

const cardData = css`
  height: 38px;
  margin-top: 4px;
  margin-bottom: 0;
  overflow: hidden;
  color: rgba(0,0,0,.85);
  font-size: 30px;
  line-height: 38px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const icon = color => css`
  font-size: 32px;
  ${color ? `color: ${color};`: ''}
`;

const cardDataWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const submitButton = css`
  margin-top: 20px;
  float: right;
`;

export default {
  cardTitle,
  cardData,
  cardDataWrapper,
  icon,
  submitButton
}