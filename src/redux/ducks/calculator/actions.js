import { prefix } from './constants';


export const submit = (name) => {
  return {
    type: prefix + name.toUpperCase(),
    name
  }
}
