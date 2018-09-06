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
  calculator: state.calculator,
});
const actionProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      submit,
    },
    dispatch,
  ),
});

/**
 * Root Application
 * TODO: handle global React Exception
 */
class App extends Component {
  static propTypes = {
    calculator: PropTypes.shape({
      accumulator: PropTypes.array,
      memory: PropTypes.bool,
      error: PropTypes.bool,
      off: PropTypes.bool,
    }).isRequired,
  };

  reset = () => {
    persistor.purge();
  };

  render() {
    const { calculator } = this.props;

    return (
      <Fragment>
        <Page>
          <Calculator {...calculator} onBtnClick={this.props.actions.submit} onOffClick={this.reset} />
        </Page>
      </Fragment>
    );
  }
}

export default withRouter(connect(stateToProps, actionProps)(App));
