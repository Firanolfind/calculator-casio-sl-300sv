import Decimal from 'decimal.js';

export default function root(state) {
  const { calculated } = state;
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
