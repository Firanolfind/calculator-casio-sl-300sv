import * as a from './constants';
import Decimal from 'decimal.js';

const limitsize = 8;
const max = new Decimal([...Array(limitsize)].map(() => '9').join(''));

const initialState = {
  error: false,
  minus: false,
  accumulator: ['0'],
  memory: 0,
  operator: null,
  calculated: false,
  off: true,
  dot: false,
};

export default (state = initialState, { type }) => {
  const { operator, calculated, memory, off, dot } = state;
  const accumulator = [...state.accumulator];
  const length = accumulator.length;
  let error = false;

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
        memory: state.memory,
        off,
      };
    // case a.DOT: {
    //   if ((length < 1 && !accumulator[length]) || calculated) {
    //     return {
    //       ...state,
    //       operator: null,
    //       calculated: false,
    //       accumulator: [0],
    //       dot: true,
    //     };
    //   }

    //   return {
    //     ...state,
    //     dot: true,
    //   };
    // }
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
    case a.NINE: {
      const isDot = type == a.DOT;
      let digit = new Decimal(a.numbers[type]).toString();
      digit = isDot ? digit + '.' : digit;

      if (calculated) {
        return {
          ...state,
          calculated: false,
          accumulator: [digit],
          operator: null,
          dot: false,
          error,
        };
      }

      if (length === 0 || (length === 1 && operator)) {
        return {
          ...state,
          calculated: false,
          accumulator: [...accumulator, digit],
          dot: false,
          error,
        };
      }

      let str = accumulator[length - 1];
      str = dot || isDot ? str + '.' : str;
      const baseNum = new Decimal(str);

      if (isDot) {
        return {
          ...state,
          dot: false,
        };
      }

      if (str.replace('.', '').length > limitsize - 1) {
        return state;
      }

      let value = str + a.numbers[type];
      value = value.split('.');
      value[0] = ~~value[0];
      accumulator[length - 1] = value.join('.');

      return {
        ...state,
        calculated: false,
        accumulator: accumulator,
        dot: isDot,
        error,
      };
    }

    case a.PLUS:
    case a.MINUS:
    case a.MULTIPLY:
    case a.DIVIDE: {
      if (length > 1) {
        let value = new Decimal(accumulator[0]);

        value = calculated ? value : value[operator](accumulator[1]);

        if (value.abs().comparedTo(max) > 0) {
          value = max.mul(value.comparedTo(0));
          error = true;
        }

        return {
          ...state,
          calculated: false,
          accumulator: [value.toString()],
          operator: a.operators[type],
          dot: false,
          error,
        };
      }

      return {
        ...state,
        calculated: false,
        operator: a.operators[type],
        dot: false,
      };
    }

    case a.EQUAL: {
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
        accumulator: accumulator,
        dot: false,
        error,
      };
    }

    case a.ROOT: {
      if (length) {
        const l = calculated ? 0 : length - 1;
        const value = new Decimal(accumulator[l]).sqrt();
        accumulator[l] = value.toString();
        return {
          ...state,
          accumulator: accumulator,
          dot: false,
        };
      }

      return state;
    }

    case a.PERCENT: {
      let value;

      if (length > 1 && !calculated) {
        value = new Decimal(accumulator[0])[operator](accumulator[1]).mul(0.01);
      } else {
        value = new Decimal(accumulator[0]).mul(0.01);
      }

      if (value.abs().comparedTo(max) > 0) {
        value = max.mul(value.comparedTo(0));
        error = true;
      }

      return {
        ...state,
        calculated: true,
        accumulator: [value.toString()],
        operator: null,
        dot: false,
        error,
      };

      return state;
    }

    case a.PLUSMINUS: {
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

    case a.MEMORYRECALL: {
      const l = calculated ? 0 : length - 1;
      accumulator[l] = new Decimal(memory).toString();
      return {
        ...state,
        calculated: true,
        accumulator: [...accumulator],
        dot: false,
      };
    }

    case a.MEMORYCLEAR: {
      return {
        ...state,
        memory: 0,
        dot: false,
      };
    }

    case a.MEMORYMINUS: {
      if (!length) {
        return state;
      }
      const l = calculated ? 0 : length - 1;
      const value = new Decimal(accumulator[l]).sub(memory);
      return {
        ...state,
        calculated: true,
        memory: value.toNumber(),
        dot: false,
      };
    }

    case a.MEMORYPLUS: {
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
        dot: false,
      };
    }

    default:
      return state;
  }
};
