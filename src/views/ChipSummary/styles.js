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

const breadcumbWrapper = css`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const buttonWrapper = css`
  margin-right: 5px;
`;

const breadcumbStyle = css`
  cursor: pointer;
`;

export default {
  title,
  greenText,
  redText,
  breadcumbWrapper,
  buttonWrapper,
  breadcumbStyle
};