import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Menu.sass';

class Menu extends PureComponent {
  render() {
    const { memory, minus, error } = this.props;
    return (
      <div className={classNames(style.Menu)}>
        <div className={classNames("memory", { on: memory })}>m</div>
        <div className={classNames("minus", { on: minus })}/>
        <div className={classNames("error", { on: error })}>e</div>
      </div>
    );
  }
}

export default Menu;
