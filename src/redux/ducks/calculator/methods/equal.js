import Decimal from 'decimal.js';

export default function(state, max) {
  const { operator, calculated } = state;
  const accumulator = [...state.accumulator];
  const length = accumulator.length;
  let error = false;

  if (!length || !operator) {
    return state;
  }

  if (length === 1) {
    accumulator.push(accumulator[0]);
  }

  let value = new Decimal(accumulator[0])[operator](accumulator[length - 1]);

  if (value.abs().comparedTo(max) > 0) {
    value = max.mul(value.comparedTo(0));
    error = true;
  }

  accumulator[0] = value.toString();

  return {
    ...state,
    calculated: true,
    accumulator,
    error,
  };
}
