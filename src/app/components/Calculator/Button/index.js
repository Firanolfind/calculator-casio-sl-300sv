import React, { PureComponent } from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Button.sass';

class Button extends PureComponent {

  static defaultProps = {
    onClick: noop
  }

  handleClick = () => {
    this.props.onClick(this.props.name);
  }

  render() {
    const { children, name, size, active, color } = this.props;
    return (
      <button
        onClick={this.handleClick}
        className={classNames(style.Button, {
          sm: size === 'sm',
          lg: size === 'lg',
          active: active,
          [`color-${color}`]: color
        })}
      >
        <div className="bg">
        </div>
        <div className={classNames("content", {
            after: !children,
            [`icon-${name}`]: name
          })}
        >
          {children}
        </div>
      </button>
    );
  }
}

export default Button;
