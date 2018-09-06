import Decimal from 'decimal.js';
import * as a from './../constants';

export default function percent(state, max) {
  const { operator, calculated } = state;
  const accumulator = [...state.accumulator];
  const length = accumulator.length;
  let error = false;
  let value;

  if (length > 1 && !calculated) {
    value = new Decimal(accumulator[0])[operator](accumulator[1]).mul(0.01);
  } else {
    value = new Decimal(accumulator[0]).mul(0.01);
  }

  if (value.abs().comparedTo(max) > 0) {
    value = max.mul(value.comparedTo(0));
    error = true;
  }

  return {
    ...state,
    operator: null,
    calculated: true,
    accumulator: [value.toString()],
    error,
  };

  return state;
}
