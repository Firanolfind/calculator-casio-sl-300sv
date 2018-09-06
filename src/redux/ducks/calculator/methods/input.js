import Decimal from 'decimal.js';
import * as a from './../constants';

export default function(state, type, limitsize) {
  const { operator, calculated } = state;
  const accumulator = [...state.accumulator];
  const { length } = accumulator;
  const isDot = type === a.DOT;

  if (calculated) {
    const char = isDot ? '0.' : new Decimal(a.numbers[type]).toString();
    return {
      ...state,
      calculated: false,
      accumulator: [char],
      operator: null,
    };
  }

  if (length === 0 || (length === 1 && operator)) {
    const char = isDot ? '0.' : new Decimal(a.numbers[type]).toString();
    return {
      ...state,
      calculated: false,
      accumulator: [...accumulator, char],
    };
  }

  let str = accumulator[length - 1];

  if (isDot) {
    str = /\./.test(str) ? str : str + '.';
  } else {
    str += a.numbers[type];
    str = str.split('.');
    str[0] = ~~str[0];
    str = str.join('.');
  }

  if (!isDot && str.replace('.', '').length > limitsize) {
    return state;
  }

  accumulator[length - 1] = str;

  return {
    ...state,
    calculated: false,
    accumulator,
  };
}
