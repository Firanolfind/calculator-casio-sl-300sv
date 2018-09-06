import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './Button.sass';

class Button extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
  };

  static defaultProps = {
    active: false,
    color: '',
    size: '',
  };

  handleClick = () => {
    this.props.onBtnClick(this.props.name);
  };

  render() {
    const { children, name, size, active, color } = this.props;
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={classNames(style.Button, {
          sm: size === 'sm',
          lg: size === 'lg',
          [`color-${color}`]: color,
          [`button-${name}`]: name,
          active,
        })}
      >
        <div className="bg" />
        <div
          className={classNames('content', {
            [`icon-${name}`]: name,
            after: !children,
          })}
        >
          {children}
        </div>
      </button>
    );
  }
}

export default Button;
