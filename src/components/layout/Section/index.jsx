import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Collapse } from 'reactstrap';
import classNames from 'classnames';
import { Content } from '~/components/layout';
import style from './Section.sass';

/**
 * Section layout wrapper
 * aligns content to center
 * can render horizontal row
 * can be collapsable with
 * fancy toggle button.
 * Think of it as Row component
 */
class Section extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    hr: PropTypes.bool,
    check: PropTypes.bool,
    title: PropTypes.string,
    isCollapse: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    onEntering: PropTypes.bool,
    onEntered: PropTypes.bool,
    onExiting: PropTypes.bool,
    onExited: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  };
  /* eslint-enable react/require-default-props */

  state = {
    isOpen: this.props.defaultOpen,
  };

  toggleOpen = () => {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
    }));
  };

  render() {
    const {
      hr,
      check,
      title,
      isCollapse,
      onEntering,
      onEntered,
      onExiting,
      onExited,
      className,
      children,
    } = this.props;

    const collapseProps = {
      onEntering,
      onEntered,
      onExiting,
      onExited,
    };

    const { isOpen } = this.state;

    return (
      <Fragment>
        {hr && <hr className={style.Hr} />}
        <Content tag="section" className={classNames(style.Section, className, { isCollapse, check })}>
          {isCollapse && (
            <Row>
              <Col xs="11">
                <h5 className="title">{title}</h5>
              </Col>
              <Col xs="1">
              </Col>
            </Row>
          )}
          {isCollapse ? (
            <Collapse isOpen={isOpen} className={classNames('', style.Collapse)} {...collapseProps}>
              <Row>{children}</Row>
            </Collapse>
          ) : (
            <Row>{children}</Row>
          )}
        </Content>
      </Fragment>
    );
  }
}

export default Section;
