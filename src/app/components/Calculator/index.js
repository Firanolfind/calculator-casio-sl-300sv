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
import style from './Calculator.sass';

class Calculator extends Component {
  static propTypes = {
  };

  render() {
    return (
      <Col xs="12">
        <Row className={style.Calculator}>
          <Col xs="12" className="header" />
          <Col xs="12" className="body">
            <div className="logo">
            </div>
            <div className="solar_panel">
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
              {[...Array(7).keys()].map(item => (
                console.log(item) ||
                <Digit position={item} key={item} />
              ))}
              {[...Array(6).keys()].map(item => (
                <Dot position={item} key={item} />
              ))}
              {[...Array(6).keys()].map(item => (
                <Comma position={item} key={item} />
              ))}
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
