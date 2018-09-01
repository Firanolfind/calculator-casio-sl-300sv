import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Button.sass';

class Button extends PureComponent {
  render() {
    const {children, size, active, color} = this.props;
    return (
      <div className={classNames(style.Button, {
        sm: size === 'sm',
        lg: size === 'lg',
        active: active,
        [`color-${color}`]: color
      })}>
        <div className="bg">
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}

export default Button;
