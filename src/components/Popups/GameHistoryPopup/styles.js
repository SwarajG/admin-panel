import { css } from 'emotion';

const modalClass = css`
  width: 80% !important;
  @media (max-width: 620px) {
    max-width: 100% !important;
    width: 100% !important;
    height: 100% !important;
    top: 0;
    margin-top: 0;
  }
`;

const userWrapper = css`
  display: flex;
`;

export default {
  modalClass,
  userWrapper
};