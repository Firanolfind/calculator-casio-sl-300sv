import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Autocomplete } from '~/components/common';

/**
 * redux-form Field + Autocomplete component
 */
class AutocompleteRedux extends Component {
  renderAutocomplete = ({ input, meta, invalidMessage, onChange, ...other }) => {
    const { invalid, error, touched } = meta;
    return (
      <Autocomplete
        onClear={() => input.onChange('')}
        onSelect={input.onChange}
        {...input}
        {...other}
        invalid={!touched && invalid}
        invalidMessage={error || invalidMessage}
      />
    );
  };

  handleChange = (item, value, prevValue = null) => {
    /* skip triggering onChange if value did not change */
    if (value !== prevValue) {
      this.props.onChange(value);
    }
  };

  render() {
    return <Field {...this.props} type="text" onChange={this.handleChange} component={this.renderAutocomplete} />;
  }
}

export default AutocompleteRedux;
