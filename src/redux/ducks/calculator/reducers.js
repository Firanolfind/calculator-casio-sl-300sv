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
  const { accumulator, operator, calculated } = state;
  let error = false;
  const length = accumulator.length;

  switch (type) {
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
        let value = new Decimal(accumulator[0])[operator](accumulator[1]);
        if (value.comparedTo(max) > 0) {
          value = max;
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
        accumulator: [...accumulator],
        operator: a.operators[type],
        error,
      };
    }

    case a.EQUAL: {
      if (length > 1) {
        let value = new Decimal(accumulator[0])[operator](accumulator[1]);
        console.log(value.toNumber());
        if (value.comparedTo(max) > 0) {
          value = max;
          error = true;
        }
        return {
          ...state,
          calculated: true,
          accumulator: [value.toNumber()],
          operator: null,
          error,
        };
      }
      return state;
    }

    case a.ROOT: {
      if (length === 1) {
        const value = new Decimal(accumulator[0]).sqrt();
        return {
          ...state,
          calculated: true,
          accumulator: [value.toNumber()],
          operator: null,
          error,
        };
      }

      if (length > 1) {
        let value = new Decimal(accumulator[0])[operator](accumulator[1]).sqrt();
        if (value.comparedTo(max) > 0) {
          value = max;
          error = true;
        }
        return {
          ...state,
          calculated: true,
          accumulator: [value.toNumber()],
          operator: null,
          error,
        };
      }
      return state;
    }
  }

  return state;
};
