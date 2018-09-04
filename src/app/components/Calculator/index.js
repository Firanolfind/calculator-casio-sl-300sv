import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Display from './Display';
import Btn from './Button';
import Digit from './Digit';
import Comma from './Comma';
import Dot from './Dot';
import Menu from './Menu';
import style from './Calculator.sass';

const Col5 = ({ children, xs }) => (
  <div
    className={classNames('col', 'col5', {
      [`col5-${xs}`]: xs,
    })}
  >
    {children}
  </div>
);

class Calculator extends Component {
  static propTypes = {};

  static defaultProps = {
    memory: false,
    error: false,
    accumulator: [0],
    calculated: true,
  };

  Button = (props) => <Btn onBtnClick={this.props.onBtnClick} {...props} />;

  render() {
    const { memory, error, accumulator, calculated, dot, off, onOffClick } = this.props;

    // const digits = this.props.digits.reverse();

    const Button = this.Button;

    const length = accumulator.length;
    const l = calculated ? 0 : length - 1;
    const number = length ? accumulator[l] : 0;
    const minus = number < 0;
    const abs = Math.abs(number);
    const stringNum = abs.toString().split('.');
    const int = stringNum[0];
    const decimal = stringNum[1] || '';
    const dotPos = decimal ? decimal.length : 0;
    const commaPos = [...Array(~~(int.length / 3)).keys()]
      .filter((item) => int.length > 3)
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
            <div className="logo" />
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
              {[...Array(8).keys()]
                .reverse()
                .map((item) => <Digit position={item} key={item} number={digits[item]} off={off} />)}
              {[...Array(8).keys()]
                .reverse()
                .map((item) => <Dot position={item} key={item} on={!off && (dotPos || dot) && item === dotPos} />)}
              {[...Array(7).keys()]
                .reverse()
                .map((item) => <Comma position={item} key={item} on={!off && commaPos.indexOf(item) > -1} />)}
              <Menu minus={minus} memory={memory} error={error} off={off} />
            </Display>
            <Row className="buttonRow">
              <Col xs="7" className="modelName">
                SL-300SV
              </Col>
              <Button size="sm" name="root" />
              <Button name="off" size="sm" onBtnClick={onOffClick}>
                OFF
              </Button>
            </Row>
            <Row className="buttonRow">
              <Button name="memoryClear">MC</Button>
              <Button name="memoryReCall">MR</Button>
              <Button name="memoryMinus">M–</Button>
              <Button name="memoryPlus">M+</Button>
              <Button name="divide" />
            </Row>
            <Row className="buttonRow">
              <Button name="percent" />
              <Button name="seven" />
              <Button name="eight" />
              <Button name="nine" />
              <Button name="multiply" />
            </Row>
            <Row className="buttonRow">
              <Button name="plusminus" />
              <Button name="four" />
              <Button name="five" />
              <Button name="six" />
              <Button name="minus" />
            </Row>
            <Row>
              <Col5 xs="4">
                <Row className="buttonRow">
                  <Button name="clear" color="red" w1_4>
                    C
                  </Button>
                  <Button name="one" w1_4 />
                  <Button name="two" w1_4 />
                  <Button name="three" w1_4 />
                </Row>
                <Row className="buttonRow">
                  <Button name="allClear" color="red" w1_4>
                    AC
                  </Button>
                  <Button name="zero" w1_4 />
                  <Button name="dot" w1_4 />
                  <Button name="equal" w1_4 />
                </Row>
              </Col5>
              <Col5 xs="1">
                <Button name="plus" size="lg" w100 />
              </Col5>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Calculator;
