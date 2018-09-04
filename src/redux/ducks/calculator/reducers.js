import * as a from './constants';
import Decimal from 'decimal.js';

const limitsize = 8;
const max = new Decimal([...Array(limitsize)].map(() => '9').join(''));

const initialState = {
  memory: null,
  error: false,
  minus: false,
  number: 0,
  accumulator: [],
  memory: 0,
  operator: null,
  calculated: false,
};

export default (state = initialState, { type }) => {
  const { accumulator = [], operator, calculated } = state;
  const length = accumulator.length;
  let error = false;

  switch (type) {
    case 'persist/PURGE':
    case a.ALLCLEAR:
      return initialState;
    case a.CLEAR:
      return {
        ...initialState,
        memory: state.memory,
      };
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
          error,
        };
      }
      if (length === 0 || (length === 1 && operator)) {
        return {
          ...state,
          calculated: false,
          accumulator: [...accumulator, number.toNumber()],
          error,
        };
      }

      const str = accumulator[length - 1].toString();

      if (str.length > limitsize - 1) {
        return state;
      }

      const value = str + a.numbers[type];
      accumulator[length - 1] = new Decimal(value).toNumber();
      return {
        ...state,
        calculated: false,
        accumulator: [...accumulator],
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
  }

  return state;
};
