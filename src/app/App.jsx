import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { persistor } from '~/redux/store';

import { Page } from '~/components/layout';

import Calculator from './components/Calculator';

/**
 * Setup redux-react connection
 */
const stateToProps = (state) => ({
});
const actionProps = (dispatch) => ({
  actions: bindActionCreators({ }, dispatch),
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
    return (
      <Fragment>
        <Page>
          <Calculator />
        </Page>
      </Fragment>
    );
  }
}

export default withRouter(connect(stateToProps, actionProps)(App));
