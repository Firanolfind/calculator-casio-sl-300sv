import * as a from './constants';
import Decimal from 'decimal';

const initialState = {
    memory: null,
    error: false,
    minus: false,
    number: 0,
    accumulator: [],
    memory: 0,
    operator: null,
    calculated: false
};

export default (state = initialState, { type }) => {

  const { accumulator, operator, calculated } = state;
  const length = accumulator.length;

  switch(type) {
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
          accumulator: [number.toNumber()]
        }
      }

      if(length === 0 || (length === 1 && operator)) {
        return {
          ...state,
          calculated: false,
          accumulator: [...accumulator, number.toNumber()]
        }
      }

      const str = accumulator[length - 1].toString();
      const value = str + a.numbers[type];
      accumulator[length - 1] = new Decimal(value).toNumber();

      return {
        ...state,
        calculated: false,
        accumulator: [...accumulator]
      }
    }

    case a.PLUS:
    case a.MINUS:
    case a.MULTIPLY:
    case a.DIVIDE: {

      if(length > 1) {
        const value = new Decimal(accumulator[0])[operator](accumulator[1]);
        return {
          ...state,
          calculated: false,
          accumulator: [value.toNumber()],
          operator: a.operators[type]
        }
      }

      return {
        ...state,
        calculated: false,
        accumulator: [...accumulator],
        operator: a.operators[type]
      }
    }

    case a.EQUAL: {

      if(length > 1) {
        const value = new Decimal(accumulator[0])[operator](accumulator[1]);

        return {
          ...state,
          calculated: true,
          accumulator: [value.toNumber()],
          operator: null
        }
      }

      return state;
    }
  }

  return state;
}

