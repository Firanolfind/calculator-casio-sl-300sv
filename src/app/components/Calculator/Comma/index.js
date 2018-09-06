import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Comma.sass';

class Comma extends PureComponent {
  static propTypes = {
    position: PropTypes.number,
    on: PropTypes.bool,
  };

  static defaultProps = {
    position: 0,
    on: false,
  };

  render() {
    const { position, on } = this.props;
    return <div className={classNames(style.Comma, `comma-${position}`, { on })} />;
  }
}

export default Comma;
