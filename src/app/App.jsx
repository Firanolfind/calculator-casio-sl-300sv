import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { persistor } from '~/redux/store';
import { Page } from '~/components/layout';
import Calculator from './components/Calculator';
import { submit } from '~/redux/ducks/calculator/actions';

/**
 * Setup redux-react connection
 */
const stateToProps = (state) => ({
  memory: state.calculator.memory,
  error: state.calculator.error,
  accumulator: state.calculator.accumulator,
});
const actionProps = (dispatch) => ({
  actions: bindActionCreators({
    submit
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
      accumulator
    } = this.props;

    const calcProps = {
      memory,
      error,
      accumulator
    };

    return (
      <Fragment>
        <Page>
          <Calculator
            {...calcProps}
            onBtnClick={this.props.actions.submit}
            onOffClick={this.reset}
          />
        </Page>
      </Fragment>
    );
  }
}

export default withRouter(connect(stateToProps, actionProps)(App));
