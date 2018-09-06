import Decimal from 'decimal.js';

export default function memoryrecall(state) {
  const { calculated, memory } = state;
  const accumulator = [...state.accumulator];
  const length = accumulator.length;
  const l = calculated ? 0 : length - 1;

  accumulator[l] = new Decimal(memory).toString();

  return {
    ...state,
    calculated: true,
    accumulator: [...accumulator],
  };
}
