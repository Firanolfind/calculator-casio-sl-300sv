import React from 'react';
import { Field } from 'redux-form';
import { Input } from '~/components/common';

const renderCheckbox = ({ input, meta, valid, invalidMessage, ...other }) => {
  const { invalid, error, touched } = meta;
  return <Input {...input} {...other} invalid={!touched && invalid} invalidMessage={error || invalidMessage} />;
};

/**
 * redux-form Field + Input component
 */
export default (props) => <Field {...props} component={renderCheckbox} />;
