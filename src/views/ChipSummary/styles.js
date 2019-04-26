import { css } from 'emotion';
import { colors } from '../../utils/enums';

const title = css`
  font-size: 24px;
`;

const greenText = css`
  color: ${colors.green};
`;

const redText = css`
  color: ${colors.red};
`;

export default {
  title,
  greenText,
  redText
};