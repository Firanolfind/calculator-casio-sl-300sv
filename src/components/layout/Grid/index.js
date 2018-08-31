import React from 'react';
import { Col } from 'reactstrap';
import classNames from 'classnames';

export const ColWide = ({ children, className, ...attributes }) => (
  <Col className={classNames(className, 'wide')} {...attributes}>
    {children}
  </Col>
);
