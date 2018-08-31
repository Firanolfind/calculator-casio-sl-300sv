import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Icon.sass';

class Icon extends PureComponent {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    ariaLabel: PropTypes.string,
    pseudo: PropTypes.oneOf(['before', 'after']),
  };
  /* eslint-enable react/require-default-props */

  render() {
    const { tag: Tag = 'span', name, pseudo = 'before', ariaLabel, className, children, ...attributes } = this.props;
    return name ? (
      <Tag
        {...attributes}
        className={classNames(className, styles.Icon, `icon-${name}`, pseudo)}
        aria-label={ariaLabel}
      >
        {children}
      </Tag>
    ) : null;
  }
}

export default Icon;
