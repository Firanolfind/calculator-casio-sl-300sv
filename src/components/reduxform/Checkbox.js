import React from 'react';
import { Field } from 'redux-form';
import { Checkbox } from '~/components/common';

const renderCheckbox = ({ input, meta, invalidMessage, ...other }) => {
  const { invalid, error, touched } = meta;
  return <Checkbox {...input} {...other} invalid={!touched && invalid} invalidMessage={error || invalidMessage} />;
};

/**
 * redux-form Field + Checkbox component
 */
export default (props) => <Field {...props} type="checkbox" component={renderCheckbox} />;
