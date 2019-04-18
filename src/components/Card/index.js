import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all .3s;
  margin-bottom: 24px;
  padding: 32px;
`;

const CardBody = styled.div`
  padding: 10px;
`;

export default function CardComponent(props) {
  return (
    <Card>
      <CardBody>
        {props.children}
      </CardBody>
    </Card>
  )
}