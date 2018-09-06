import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Digit.sass';

var DIGIT_BITMAP = [
  [1, 1, 1, 0, 1, 1, 1], // 0
  [0, 0, 1, 0, 0, 1, 0], // 1
  [1, 0, 1, 1, 1, 0, 1], // 2
  [1, 0, 1, 1, 0, 1, 1], // 3
  [0, 1, 1, 1, 0, 1, 0], // 4
  [1, 1, 0, 1, 0, 1, 1], // 5
  [1, 1, 0, 1, 1, 1, 1], // 6
  [1, 1, 1, 0, 0, 1, 0], // 7
  [1, 1, 1, 1, 1, 1, 1], // 8
  [1, 1, 1, 1, 0, 1, 1], // 9
];

class Digit extends PureComponent {
  static propTypes = {
    position: PropTypes.number,
    number: PropTypes.number,
    minus: PropTypes.bool,
    off: PropTypes.bool,
  };

  static defaultProps = {
    position: 0,
    number: null,
    minus: false,
    off: true,
  };

  render() {
    const { position, number, off, minus } = this.props;
    return (
      <div className={classNames(style.Digit, 'digit', `digit-${position}`)}>
        {[...Array(7).keys()].map((item) => (
          <div
            className={classNames('bar', `bar-${item}`, {
              on: (!off && typeof number === 'number' && DIGIT_BITMAP[number][item]) || (minus && item === 3),
            })}
            key={item}
          />
        ))}
      </div>
    );
  }
}

export default Digit;
