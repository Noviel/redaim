import { EXEC_UNKNOWN } from './constants';
/*
  Extract matching field from every object in an array or 
  subfield from every object's field and put it to object.
*/
export const extractValues = (collection = {}, field) => {
  if (typeof field !== 'string') {
    throw new Error('name should be a string');
  }
  
  return Object.keys(collection).reduce((acc, curr) => {
    const prop = collection[curr][field];
    
    if (prop !== undefined) { 
      acc[curr] = prop; 
    }

    return acc;
  }, {});
};

export const execSelector = ({ meta : { exec = EXEC_UNKNOWN } = {} }) =>  exec;

export const createReducerWithHandlers = (handlers = {}, keySelector = execSelector) => (state, action) => {
  if (typeof handlers !== 'object') {
    return state;
  }
  
  const key = keySelector(action);

  if (!handlers.hasOwnProperty(key)) {
    return state;
  }

  return handlers[key](state, action);
};
