import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Digit.sass';

class Digit extends PureComponent {
  render() {
    const { position } = this.props;
    return (
      <div className={classNames(style.Digit, 'digit', `digit-${position}`)}>
        {[...Array(7).keys()].map(item => (
          <div className={classNames('bar', `bar-${item}`)} key={item} />
        ))}
      </div>
    );
  }
}

export default Digit;
