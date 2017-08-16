import { createStore } from '../lib/redux';
import rootReducer from './root-reducer';

export default function() {
  return createStore({ plain: 'plain state' }, rootReducer);
}
