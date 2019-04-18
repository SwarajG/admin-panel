import { css } from 'emotion';

const logo = css`
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background: #002140;
  transition: all .3s;
`;

const name = css`
  display: inline-block;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
  vertical-align: middle;
  text-transform: capitalize;
`;

const menuText = css`
  margin-top: 0;
  margin-bottom: 0;
`;

const headerWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const headerName = css`
  margin-bottom: 0;
  font-size: 24px;
`;

export default {
  name,
  logo,
  menuText,
  headerWrapper,
  headerName
};