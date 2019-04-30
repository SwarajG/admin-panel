import { css } from 'emotion';
import { colors } from '../../../utils/enums';

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

const textColor = isWinner => css`
  color: ${isWinner ? colors.green : colors.red};
`;

export default {
  modalClass,
  userWrapper,
  textColor
};