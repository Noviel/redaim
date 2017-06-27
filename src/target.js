import { createReducerWithHandlers } from './helpers';

const createTarget = (handlers = {}) => (initialState = null) => ({ 
  initialState, 
  reducer: createReducerWithHandlers(handlers) 
});

export default createTarget;
