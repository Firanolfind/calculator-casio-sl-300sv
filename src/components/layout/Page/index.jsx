import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import classNames from 'classnames';
import styles from './Page.sass';

const propTypes = {
  /**
   * Loading flag to indicate background activitiyes
   * overlays screen by preloader
   */
  loading: PropTypes.bool,
};

const defaultProps = {
  loading: false,
};

const Page = ({ loading, children, className }) => (
  <Container className={classNames(className, styles.Page, { loading })} fluid>
    {children}
  </Container>
);

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
