import Decimal from 'decimal.js';

export default function memoryminus(state, max) {
  const { calculated, memory } = state;
  const accumulator = [...state.accumulator];
  const { length } = accumulator;
  if (!length) {
    return state;
  }
  const l = calculated ? 0 : length - 1;
  let value = new Decimal(accumulator[l]).add(memory);
  if (value.abs().comparedTo(max) > 0) {
    value = max.mul(value.comparedTo(0));
  }
  return {
    ...state,
    calculated: true,
    memory: value.toNumber(),
  };
}
