import React from 'react';
import { Field } from 'redux-form';
import Select, { getOptionValue } from '~/components/common/Select';

/**
 * onChange from Redux Form Field has to be called explicity.
 */
export const singleChangeHandler = (fn) => (item) => fn(item ? getOptionValue(item) : '');

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
export const multiChangeHandler = (fn) => (item) => fn(item.map((subItem) => getOptionValue(subItem)));

/**
 * For single select, Redux Form keeps the value as a string, while React Select
 * wants the value in the form { value: "grape", label: "Grape" }
 *
 * * For multi select, Redux Form keeps the value as array of strings, while React Select
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
export const transformValue = (value, options, isMulti) => {
  if (isMulti && typeof value === 'string') return [];

  const filteredOptions = options
    ? options.filter((option) => {
        const val = getOptionValue(option);
        return isMulti ? value.indexOf(val) !== -1 : val === value;
      })
    : [];

  return isMulti ? filteredOptions : filteredOptions[0] || '';
};

/**
 * component renderer
 * Inspired by https://gist.github.com/leocristofani/98312e61807db8f32e720c9f97a186e5
 */
const renderSelect = ({ input, meta, options, isMulti, invalidMessage, ...other }) => {
  const { value, onChange, onFocus, onBlur, ...inputProps } = input;
  const { invalid, error, touched } = meta;
  const transformedValue = transformValue(value, options, isMulti);
  return (
    <Select
      {...inputProps}
      {...other}
      value={transformedValue}
      isMulti={isMulti}
      invalid={!touched && invalid}
      options={options}
      invalidMessage={error || invalidMessage}
      onChange={isMulti ? multiChangeHandler(onChange) : singleChangeHandler(onChange)}
      // onBlur={() => onBlur(transformedValue)}
      onFocus={onFocus}
    />
  );
};

/**
 * redux-form Field + Select component
 */
export default (props) => <Field {...props} type="select" component={renderSelect} />;
