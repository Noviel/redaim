/* minimal redux implementation */
let state = undefined;
let listeners = [];

const createStore = (initialState, reducer) => {
  if (initialState) {
    state = initialState;
  }

  function dispatch(action) {
    const nextState = reducer(state, action);
    state = nextState;
        
    for (const l of listeners) {
      l(state, action);
    }
  }

  function subscribe(callback) {
    listeners.push(callback);

    return () => (listeners = listeners.filter(l => l !== callback));
  }

  const getState = () => state;

  dispatch({ type: '@@INIT' });

  return { dispatch, subscribe, getState };
};

exports.createStore = createStore;

exports.combine = reducers => {
  const keys = Object.keys(reducers);
  const nextState = {};

  return (state, action) => {
    for (const k in keys) {
      const key = keys[k];
      const reducer = reducers[key];
      
      nextState[key] = reducer(state[key], action);
    }

    return nextState;
  };
};
