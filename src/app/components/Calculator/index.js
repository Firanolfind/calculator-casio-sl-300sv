import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import Decimal from 'decimal.js';
import { noop } from 'lodash';
import Display from './Display';
import Btn from './Button';
import Digit from './Digit';
import Comma from './Comma';
import Dot from './Dot';
import Menu from './Menu';
import style from './Calculator.sass';
import logo from '~/media/logo.svg';

class Calculator extends Component {
  static propTypes = {
    accumulator: PropTypes.array.isRequired,
    onOffClick: PropTypes.func,
    calculated: PropTypes.bool,
    memory: PropTypes.bool,
    error: PropTypes.bool,
    off: PropTypes.bool,
  };

  static defaultProps = {
    onOffClick: noop,
    calculated: true,
    memory: false,
    error: false,
    off: true,
  };

  maxDigit = 8;

  Button = (props) => <Btn onBtnClick={this.props.onBtnClick} {...props} />;

  handleOffClick = (...args) => {
    this.props.onBtnClick(...args);
    this.props.onOffClick(...args);
  };

  render() {
    const { maxDigit, Button, handleOffClick } = this;
    const { memory, error, accumulator, calculated, off } = this.props;

    const { length } = accumulator;
    const l = calculated ? 0 : length - 1;
    const str = length ? accumulator[l] : '0';
    const number = Decimal(str);
    const minus = number.isNegative();
    const abs = String(str).replace('-', '');
    const stringNum = abs
      .toString()
      .slice(0, maxDigit + 1)
      .split('.');
    const dot = stringNum.length > 1;
    const int = stringNum[0];
    const decimal = stringNum[1] || '';
    const dotPos = decimal ? decimal.length : 0;
    const commaPos = [...Array(~~(int.length / 3)).keys()]
      .filter(() => int.length > 3)
      .map((item) => item * 3)
      .map((item) => dotPos + item)
      .map((item) => item + 2);

    const digits = (int + decimal)
      .split('')
      .reverse()
      .map((item) => ~~item);

    return (
      <Col xs="12">
        <Row className={style.Calculator}>
          <Col xs="12" className="header" />
          <Col xs="12" className="body">
            <img className="logo" src={logo} alt="" />
            <div className="solarPanel">
              <div className="cells">
                <div className="cell" />
                <div className="cell" />
                <div className="cell" />
                <div className="cell" />
              </div>
            </div>
            <div className="slogan">two way power</div>
            <Display>
              {[...Array(maxDigit).keys()]
                .reverse()
                .map((item) => (
                  <Digit
                    position={item}
                    key={item}
                    number={digits[item]}
                    off={off}
                    minus={minus && digits.length === item}
                  />
                ))}
              {[...Array(maxDigit).keys()]
                .reverse()
                .map((item) => <Dot position={item} key={item} on={!off && (dotPos || dot) && item === dotPos} />)}
              {[...Array(7).keys()]
                .reverse()
                .map((item) => <Comma position={item} key={item} on={!off && commaPos.indexOf(item) > -1} />)}
              <Menu minus={minus && digits.length === maxDigit} memory={memory} error={error} off={off} />
            </Display>
            <div className="buttons">
              <Row>
                <div className="modelName">SL-300SV</div>
                <Button size="sm" name="root" />
                <Button name="off" size="sm" onBtnClick={handleOffClick}>
                  OFF
                </Button>
              </Row>
              <Row>
                <Button name="memoryClear">MC</Button>
                <Button name="memoryReCall">MR</Button>
                <Button name="memoryMinus">M–</Button>
                <Button name="memoryPlus">M+</Button>
                <Button name="divide" />
              </Row>
              <Row>
                <Button name="percent" />
                <Button name="seven" />
                <Button name="eight" />
                <Button name="nine" />
                <Button name="multiply" />
              </Row>
              <Row>
                <Button name="plusminus" />
                <Button name="four" />
                <Button name="five" />
                <Button name="six" />
                <Button name="minus" />
              </Row>
              <Row>
                <Col className="btns-4">
                  <Row>
                    <Button name="clear" color="red">
                      C
                    </Button>
                    <Button name="one" />
                    <Button name="two" />
                    <Button name="three" />
                  </Row>
                  <Row>
                    <Button name="allClear" color="red">
                      AC
                      <label>ON</label>
                    </Button>
                    <Button name="zero" />
                    <Button name="dot" />
                    <Button name="equal" />
                  </Row>
                </Col>
                <Button name="plus" size="lg" />
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Calculator;
