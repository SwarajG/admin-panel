import { css } from 'emotion';

const formWrapper = css`
  padding: 10px 15px;
  background-color: #FFF;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

const allInputWrapper = css`
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const inputWrapper = css`
  margin-right: 15px;
`;

const responseWrapper = css`
  margin-top: 40px;
`;

export default {
  formWrapper,
  inputWrapper,
  allInputWrapper,
  responseWrapper
};