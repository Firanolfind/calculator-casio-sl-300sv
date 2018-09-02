import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import * as actions from '~/redux/global/actions';
import Display from './Display';
import Button from './Button';
import Digit from './Digit';
import Comma from './Comma';
import Dot from './Dot';
import Menu from './Menu';
import style from './Calculator.sass';

const Col5 = ({children, xs}) => (
  <div className={classNames('col', 'col5', {
    [`col5-${xs}`]: xs
  })}>{children}</div>
);

class Calculator extends Component {
  static propTypes = {
  };

  render() {
    const {
      memory = true,
      error = true,
      minus = true,
      dotPos = 0,
      commaPos = [],
      digits = [1,2,3,4,5,1,0,0,1]
    } = this.props;

    // const number = 123.8;
    // const minus = number < 0;
    // const abs = Math.abs(number);
    // const stringNum = abs.toString().split('.');
    // const int = stringNum[0];
    // const float = stringNum[1] || '';
    // const dotPos = float ? float.length : 0;
    // const commaPos = [...Array(~~(int.length/3)).keys()]
    //                     .filter(item => int.length > 3)
    //                     .map(item => item * 3)
    //                     .map(item => dotPos + item)
    //                     .map(item => item + 2);
    // const digits = (int + float)
    //                   .split('')
    //                   .reverse()
    //                   .map(item => ~~item);

    return (
      <Col xs="12">
        <Row className={style.Calculator}>
          <Col xs="12" className="header" />
          <Col xs="12" className="body">
            <div className="logo">
            </div>
            <div className="solarPanel">
              <div className="cells">
                <div className="cell"/>
                <div className="cell"/>
                <div className="cell"/>
                <div className="cell"/>
              </div>
            </div>
            <div className="slogan">
              two way power
            </div>
            <Display>
              {[...Array(8).keys()].reverse().map(item => (
                <Digit position={item} key={item} number={digits[item]} />
              ))}
              {[...Array(8).keys()].reverse().map(item => (
                <Dot position={item} key={item} on={dotPos && item === dotPos} />
              ))}
              {[...Array(7).keys()].reverse().map(item => (
                <Comma position={item} key={item} on={commaPos.indexOf(item) > -1} />
              ))}
              <Menu minus={minus} memory={memory} error={error} />
            </Display>
            <Row className="buttonRow">
              <Col xs="7" className="modelName">
                SL-300SV
              </Col>
              <Button size="sm" name="root" />
              <Button name="off" size="sm">OFF</Button>
            </Row>
            <Row className="buttonRow">
              <Button name="memoryClear">MC</Button>
              <Button name="memoryRestore">MR</Button>
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
                  <Button name="C" color="red" w1_4 />
                  <Button name="one" w1_4 />
                  <Button name="two" w1_4 />
                  <Button name="three" w1_4 />
                </Row>
                <Row className="buttonRow">
                  <Button name="allClear" color="red" w1_4>AC</Button>
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
