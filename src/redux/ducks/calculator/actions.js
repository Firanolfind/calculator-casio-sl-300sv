import { prefix } from './constants';
import audio from '~/media/click.mp3';

export const submit = (name) => {
  new Audio(audio).play();
  return {
    type: prefix + name.toUpperCase(),
    name,
  };
};
