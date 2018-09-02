import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { persistor } from '~/redux/store';
import { Page } from '~/components/layout';
import Calculator from './components/Calculator';
import { buttonClick as calcButtonClick } from '~/redux/ducks/calculator/actions';

/**
 * Setup redux-react connection
 */
const stateToProps = (state) => ({
  digits: state.calculator.digits,
  memory: state.calculator.memory,
  error: state.calculator.error,
  minus: state.calculator.minus,
  dotPos: state.calculator.dotPos,
  commaPos: state.calculator.commaPos,
});
const actionProps = (dispatch) => ({
  actions: bindActionCreators({
    calcButtonClick
  }, dispatch),
});

/**
 * Root Application
 * TODO: handle global React Exception
 */
class App extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  reset = () => {
    persistor.purge();
  };

  render() {
    const {
      memory,
      error,
      minus,
      dotPos,
      commaPos,
      digits
    } = this.props;

    const calcProps = {
      memory,
      error,
      minus,
      dotPos,
      commaPos,
      digits
    };

    return (
      <Fragment>
        <Page>
          <Calculator {...calcProps} onBtnClick={this.props.calcButtonClick} />
        </Page>
      </Fragment>
    );
  }
}

export default withRouter(connect(stateToProps, actionProps)(App));
