import { css } from 'emotion';

const inputWrapper = css`
  margin-bottom: 20px;
`;

const formWrapper = css`
  width: 50%;
  @media (max-width: 620px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const inputLength = css`
  width: 50%;
`;

export default {
  inputWrapper,
  formWrapper,
  inputLength
};