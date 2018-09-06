import Decimal from 'decimal.js';

export default function memoryminus(state) {
  const { calculated, memory } = state;
  const accumulator = [...state.accumulator];
  const length = accumulator.length;
  if (!length) {
    return state;
  }
  const l = calculated ? 0 : length - 1;
  const value = new Decimal(accumulator[l]).sub(memory);
  return {
    ...state,
    calculated: true,
    memory: value.toNumber(),
  };
}
