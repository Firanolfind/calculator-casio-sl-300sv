import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Dot.sass';

class Dot extends PureComponent {
  render() {
    const {position} = this.props;
    return (
      <div className={classNames(style.Dot, `dot-${position}`)} />
    );
  }
}

export default Dot;
