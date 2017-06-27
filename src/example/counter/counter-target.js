import { createTarget } from '../../index';

const counterHandlers = {
  INCREMENT: (state, action) => state + 1, 
  DECREMENT: (state, action) => state - 1,
  SET: (state, action) => action.payload
};

export default createTarget(counterHandlers);
