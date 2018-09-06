import Decimal from 'decimal.js';

export default function root(state) {
  const { operator, calculated, memory, off, dot } = state;
  const accumulator = [...state.accumulator];
  const { length } = accumulator;

  if (length) {
    const l = calculated ? 0 : length - 1;
    const value = new Decimal(accumulator[l]).sqrt();
    accumulator[l] = value.toString();
    return {
      ...state,
      accumulator,
    };
  }

  return state;
}
