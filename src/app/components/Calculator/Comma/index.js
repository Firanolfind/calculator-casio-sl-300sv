import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Comma.sass';

class Comma extends PureComponent {
  render() {
    const { position, on } = this.props;
    return (
      <div className={classNames(style.Comma, `comma-${position}`, { on })} />
    );
  }
}

export default Comma;
