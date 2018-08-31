import React from 'react';
import Content from '../Content';

const Page = (props) => (
  <Content className="page-404">
    <h1>Page not found</h1>
    {props.children}
  </Content>
);

export default Page;
