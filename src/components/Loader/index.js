import React from 'react';
import { css } from 'emotion';
import { Spin, Icon } from 'antd';

const loaderWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 25%;
`;

const antIcon = <Icon type="loading" style={{ fontSize: 42 }} spin />;

export default function Loader(props) {
  const { className } = props;
  return (
    <div className={`${loaderWrapper} ${className}`}>
      <Spin indicator={antIcon} />
    </div>
  )
}