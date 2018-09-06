import Decimal from 'decimal.js';

export default function memoryclear(state) {
  return {
    ...state,
    memory: 0,
  };
}
