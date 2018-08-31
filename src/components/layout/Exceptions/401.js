import React from 'react';
import Content from '../Content';

const Page = (props) => (
  <Content className="page-401">
    <h1>Unauthorized</h1>
    {props.children}
  </Content>
);

export default Page;
