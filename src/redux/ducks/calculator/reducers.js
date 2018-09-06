import * as a from './constants';
import Decimal from 'decimal.js';
import {
  inputMethod,
  operatorMethod,
  equalMethod,
  rootMethod,
  percentMethod,
  memoryplusMethod,
  memoryminusMethod,
  memoryrecallMethod,
  memoryclearMethod,
  plusminusMethod,
} from './methods';

const limitsize = 8;
const max = new Decimal([...Array(limitsize)].map(() => '9').join(''));

const initialState = {
  accumulator: ['0'],
  calculated: false,
  operator: null,
  memory: 0,
  error: false,
  off: true,
};

/* eslint-disable complexity */
export default function(state = initialState, { type }) {
  const { memory, off } = state;

  if (off && type !== a.ALLCLEAR) {
    return state;
  }

  switch (type) {
    case 'persist/PURGE':
    case a.OFF:
      return {
        ...initialState,
      };
    case a.ALLCLEAR:
      return {
        ...initialState,
        off: false,
      };
    case a.CLEAR:
      return {
        ...initialState,
        memory,
        off,
      };
    case a.DOT:
    case a.ZERO:
    case a.ONE:
    case a.TWO:
    case a.THREE:
    case a.FOUR:
    case a.FIVE:
    case a.SIX:
    case a.SEVEN:
    case a.EIGHT:
    case a.NINE:
      return inputMethod(state, type, limitsize);

    case a.PLUS:
    case a.MINUS:
    case a.MULTIPLY:
    case a.DIVIDE:
      return operatorMethod(state, type, max);

    case a.EQUAL:
      return equalMethod(state, max);

    case a.ROOT:
      return rootMethod(state);

    case a.PERCENT:
      return percentMethod(state, max);

    case a.PLUSMINUS:
      return plusminusMethod(state);

    case a.MEMORYRECALL:
      return memoryrecallMethod(state);

    case a.MEMORYCLEAR:
      return memoryclearMethod(state);

    case a.MEMORYMINUS:
      return memoryminusMethod(state);

    case a.MEMORYPLUS:
      return memoryplusMethod(state, max);

    default:
      return state;
  }
}
/* eslint-enable complexity */
