import { createTarget } from '../../index';

export default createTarget({
  INCREMENT: (state, action) => { console.log('incr', state); return state + 1; }, 
  DECREMENT: (state, action) => { console.log('decr', state); return state - 1; }, 
  SET: (state, action) => { console.log('set', action.payload); return action.payload; }, 
});
