import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.shallow = Enzyme.shallow;
global.render = Enzyme.render;
global.mount = Enzyme.mount;

Enzyme.configure({ adapter: new Adapter() });

console.error = (message) => {
  throw new Error(message);
};
