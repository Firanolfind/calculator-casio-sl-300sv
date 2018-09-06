import React, { PureComponent } from 'react';
import { Row } from 'reactstrap';
import style from './Display.sass';
import digitStyles from '../Digit/Digit.sass';

class Button extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Row className={style.Display}>
        <div className="inner">
          <div className={digitStyles.Digits}>{children}</div>
        </div>
      </Row>
    );
  }
}

export default Button;
