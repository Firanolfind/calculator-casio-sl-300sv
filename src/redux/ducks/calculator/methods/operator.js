import Decimal from 'decimal.js';
import * as a from './../constants';

export default function(state, type, max) {
  const { operator, calculated } = state;
  const accumulator = [...state.accumulator];
  const { length } = accumulator;
  let error = false;

  if (length > 1) {
    let value = new Decimal(accumulator[0]);

    value = calculated ? value : value[operator](accumulator[1]);

    if (value.abs().comparedTo(max) > 0) {
      value = max.mul(value.comparedTo(0));
      error = true;
    }

    return {
      ...state,
      calculated: false,
      accumulator: [value.toString()],
      operator: a.operators[type],
      error,
    };
  }

  return {
    ...state,
    calculated: false,
    operator: a.operators[type],
  };
}
