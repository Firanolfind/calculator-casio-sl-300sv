import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Menu.sass';

class Menu extends PureComponent {
  render() {
    const {position} = this.props;
    return (
      <div className={classNames(style.Menu)}>
        <div className="memory">m</div>
        <div className="minus"/>
        <div className="error">e</div>
      </div>
    );
  }
}

export default Menu;
