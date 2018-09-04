import * as a from './constants';
import Decimal from 'decimal.js';

const limitsize = 8;
const max = new Decimal([...Array(limitsize)].map(() => '9').join(''));

const initialState = {
  error: false,
  minus: false,
  number: 0,
  accumulator: [0],
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
    case a.DOT: {
      if ((length < 1 && !accumulator[length]) || calculated) {
        return {
          ...state,
          operator: null,
          calculated: false,
          accumulator: [0],
          dot: true,
        };
      }

      return {
        ...state,
        dot: true,
      };
    }
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
      const number = new Decimal(a.numbers[type]);
      if (calculated) {
        return {
          ...state,
          calculated: false,
          accumulator: [number.toNumber()],
          operator: null,
          dot: false,
          error,
        };
      }
      console.log('?');

      if (length === 0 || (length === 1 && operator)) {
        return {
          ...state,
          calculated: false,
          accumulator: [...accumulator, number.toNumber()],
          dot: false,
          error,
        };
      }

      const baseNum = new Decimal(accumulator[length - 1]);
      let str = baseNum.toString();

      if (str.replace('.', '').length > limitsize - 1) {
        return state;
      }
      str = dot && !baseNum.dp() ? str + '.' : str;
      console.log(baseNum.dp(), str, a.numbers[type]);

      const value = str + a.numbers[type];
      accumulator[length - 1] = new Decimal(value).toNumber();
      return {
        ...state,
        calculated: false,
        accumulator: [...accumulator],
        dot: false,
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
          accumulator: [value.toNumber()],
          operator: a.operators[type],
          error,
        };
      }

      return {
        ...state,
        calculated: false,
        operator: a.operators[type],
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
      accumulator[0] = value.toNumber();
      return {
        ...state,
        calculated: true,
        accumulator: [...accumulator],
        error,
      };
    }

    case a.ROOT: {
      if (length) {
        const l = calculated ? 0 : length - 1;
        const value = new Decimal(accumulator[l]).sqrt();
        accumulator[l] = value.toNumber();
        return {
          ...state,
          accumulator: [...accumulator],
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
        accumulator: [value.toNumber()],
        operator: null,
        error,
      };

      return state;
    }

    case a.PLUSMINUS: {
      if (length > 0) {
        const l = calculated ? 0 : length - 1;
        const value = new Decimal(accumulator[l]).mul(-1);
        accumulator[l] = value.toNumber();
        return {
          ...state,
          accumulator: [...accumulator],
        };
      }
      return state;
    }

    case a.MEMORYRECALL: {
      const l = calculated ? 0 : length - 1;
      accumulator[l] = memory;
      return {
        ...state,
        calculated: true,
        accumulator: [...accumulator],
      };
    }

    case a.MEMORYCLEAR: {
      return {
        ...state,
        memory: 0,
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
      };
    }

    case a.MEMORYPLUS: {
      if (!length) {
        return state;
      }
      const l = calculated ? 0 : length - 1;
      const value = new Decimal(accumulator[l]).add(memory);
      return {
        ...state,
        calculated: true,
        memory: value.toNumber(),
      };
    }

    default:
      return state;
  }
};
