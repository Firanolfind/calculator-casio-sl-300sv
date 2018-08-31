import React from 'react';
import { Field } from 'redux-form';
import { Radio } from '~/components/common';

const renderRadio = ({ input, meta, invalidMessage, ...other }) => {
  const { invalid, error, touched } = meta;
  return (
    <Radio {...input} {...other} invalid={!touched ? invalid : undefined} invalidMessage={error || invalidMessage} />
  );
};

/**
 * redux-form Field + Radio component
 */
export default (props) => <Field {...props} type="radio" component={renderRadio} />;
