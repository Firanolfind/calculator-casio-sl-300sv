import React from 'react';
import Content from '../Content';

const Page = (props) => (
  <Content className="page-500">
    <h1>Internal Server Error</h1>
    {props.children}
  </Content>
);

export default Page;
