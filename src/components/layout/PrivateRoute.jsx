import React from 'react';
import { isEmpty } from 'lodash';
import { Route, withRouter } from 'react-router-dom';
import Unauthorized from '~/components/layout/Exceptions/403';

const PrivateRoute = (props) => (
  <Route
    render={() => {
      if (isEmpty(document['iv-groups']) && isEmpty(document['iv-user'])) {
        return <Unauthorized />;
      }
      return <Route {...props} />;
    }}
  />
);

export default withRouter(PrivateRoute);
