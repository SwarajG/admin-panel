import { css } from 'emotion';

const contentWrapper = css`
  height: 100%;
  width: 40%;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const title = css`
  font-size: 32px;
`;

const inputWrapper = css`
  width: 60%;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
`;

export default {
  contentWrapper,
  inputWrapper,
  title
};