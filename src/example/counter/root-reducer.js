import { combine } from '../lib/redux';
import counters from './counters-namespace.js';

export default combine({
  plain: (state, action) => {
    if (action.type === 'PLAIN_ACTION') {
      return state + '!';
    }
    return state;
  },
  ...counters
});
