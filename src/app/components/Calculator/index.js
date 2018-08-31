import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import * as actions from '~/redux/global/actions';
import style from './Calculator.sass';

const Button = ({children}) => (
  <div className="button">
    <div className="bg">
    </div>
    <div className="content">
      {children}
    </div>
  </div>
);

class Calculator extends Component {
  static propTypes = {
  };

  render() {
    return (
      <Col xs="12">
        <div className={style.Calculator}>
          <div className="header" />
          <div className="body">
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
            <div className="displayOuter">
              <div className="displayBorder">
                <div className="displayInner">
                  <div className="digits">
                    12345
                  </div>
                </div>
              </div>
            </div>
            <div className="buttonRow">
              <div className="modelName">
                SL-300SV
              </div>
              <Button>
                sqrt
              </Button>
              <Button>
                off
              </Button>
            </div>
            <div className="buttonRow">
              <Button>
                mc
              </Button>
              <Button>
                mr
              </Button>
              <Button>
                m-
              </Button>
              <Button>
                m+
              </Button>
              <Button>
                /
              </Button>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default Calculator;
