import Decimal from 'decimal.js';

export default function plusminus(state) {
  const { calculated } = state;
  const accumulator = [...state.accumulator];
  const length = accumulator.length;

  if (length > 0) {
    const l = calculated ? 0 : length - 1;
    const value = new Decimal(accumulator[l]).mul(-1);
    accumulator[l] = value.toString();
    return {
      ...state,
      accumulator: [...accumulator],
    };
  }
  return state;
}
