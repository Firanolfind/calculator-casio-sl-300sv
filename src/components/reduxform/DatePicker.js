import React from 'react';
import Moment from 'moment';
import { Field } from 'redux-form';
import { DatePicker } from '~/components/common';
import { DATE_FORMAT } from '~/config';

const invalidDateMessage = 'Väärä päivämäärä';

const validateDate = (value) => (Moment(value, DATE_FORMAT).isValid() ? undefined : invalidDateMessage);

const renderCheckbox = ({ input, meta, valid, invalidMessage, ...other }) => {
  const { invalid, error } = meta;
  const { onChange, ...otherInput } = input;
  let value = Moment(input.value, DATE_FORMAT, true);
  if (!value.isValid()) {
    onChange('');
    value = null;
  }
  return (
    <DatePicker
      readOnly
      {...other}
      {...otherInput}
      onChange={(moment, e) => onChange(moment.format(), e)}
      value={value}
      invalid={invalid}
      invalidMessage={error || invalidMessage}
    />
  );
};

/**
 * redux-form Field + Input component
 */
export default ({ validate, ...props }) => {
  if (validate) {
    validate = Array.isArray(validate) ? [validateDate, ...validate] : [validateDate, validate];
  } else {
    validate = validateDate;
  }
  return <Field {...props} validate={validate} component={renderCheckbox} />;
};
