import { createStore } from '../lib/redux';
import rootReducer from './root-reducer';

export default function() {
  const store = createStore({ plain: 'plain state' }, rootReducer);

  return store;
}
