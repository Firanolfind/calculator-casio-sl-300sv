import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Menu.sass';

class Menu extends PureComponent {
  static propTypes = {
    memory: PropTypes.number,
    error: PropTypes.bool,
    minus: PropTypes.bool,
    off: PropTypes.bool,
  };

  static defaultProps = {
    memory: 0,
    error: false,
    minus: false,
    off: true,
  };

  render() {
    const { memory, minus, error, off } = this.props;
    return (
      <div className={classNames(style.Menu)}>
        <div className={classNames('memory', { on: !off && memory })}>m</div>
        <div className={classNames('minus', { on: !off && minus })} />
        <div className={classNames('error', { on: !off && error })}>e</div>
      </div>
    );
  }
}

export default Menu;
