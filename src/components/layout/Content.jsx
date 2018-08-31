import React from 'react';
import { Container, Row } from 'reactstrap';
import { ColWide } from '~/components/layout';
import classNames from 'classnames';

const defaultProps = {
  tag: 'section',
};

/**
 * Content layout wrapper
 * Think of it as Row outside
 * and Container inside
 */
const Content = ({ className, children, ...props }) => (
  <Row {...props} className={classNames(className, 'content')}>
    <ColWide>
      <Container>{children}</Container>
    </ColWide>
  </Row>
);

Content.defaultProps = defaultProps;

export default Content;
