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

class Calculator extends Component {
  static propTypes = {
  };

  render() {

    const {
      memory,
      error
    } = this.props;

    const number = -9234567.8;
    const minus = number < 0;
    const abs = Math.abs(number);
    const stringNum = abs.toString().split('.');
    const int = stringNum[0];
    const float = stringNum[1] || '';
    const dotPos = float ? float.length : 0;
    const commaPos = [...Array(~~(int.length/3)).keys()]
                        .filter(item => int.length > 3)
                        .map(item => item * 3)
                        .map(item => dotPos + item)
                        .map(item => item + 2);
    const digits = (int + float)
                      .split('')
                      .reverse()
                      .map(item => ~~item);

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
              <Button size="sm">
                sqrt
              </Button>
              <Button size="sm">
                off
              </Button>
            </Row>
            <Row className="buttonRow">
              <Button>
                mc
              </Button>
              <Button>
                mr
              </Button>
              <Button>
                m-
              </Button>
              <Button active>
                m+
              </Button>
              <Button>
                ÷
              </Button>
            </Row>
            <Row className="buttonRow">
              <Button>
                %
              </Button>
              <Button>
                7
              </Button>
              <Button>
                8
              </Button>
              <Button>
                9
              </Button>
              <Button>
                X
              </Button>
            </Row>
            <Row className="buttonRow">
              <Button>
                +/-
              </Button>
              <Button>
                4
              </Button>
              <Button>
                5
              </Button>
              <Button>
                6
              </Button>
              <Button>
                -
              </Button>
            </Row>
            <Row className="buttonRow">
              <Button color="red">
                C
              </Button>
              <Button>
                1
              </Button>
              <Button>
                2
              </Button>
              <Button>
                3
              </Button>
              <Button size="lg">
                +
              </Button>
            </Row>
            <Row className="buttonRow">
              <Button color="red">
                AC
              </Button>
              <Button>
                0
              </Button>
              <Button>
                .
              </Button>
              <Button>
                =
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Calculator;
