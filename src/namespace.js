import { isDev, TARGET_UNKNOWN, TRIGGER_UNKNOWN } from './constants';
import { extractValues } from './helpers';

const targetSelector = ({ meta: { target = TARGET_UNKNOWN} = {} }) => target;

const createReducer = (targetReducers = {}) => (state, action) => {
  const target = targetSelector(action);

  // if there is no target, it means something went wrong, because we can
  // find ourself here only with proper action which filtered by namespace reducer
  if (!targetReducers.hasOwnProperty(target)) {
    if (isDev) {
      console.error(`Unknown target ${target} for action ${JSON.stringify(action)}`);
    }
    return state;
  } 

  const reducer = targetReducers[target];
  const stateSlice = state[target];
  
  return {
    ...state,
    [target]: reducer(stateSlice, action)
  };
};

export default function createNamespace(targets = {}, trigger) {
  if (typeof trigger !== 'string') {
    throw new Error(`Trigger should be a string, instead got ${typeof trigger}`);
  }

  const reducer = createReducer(extractValues(targets, 'reducer'));
  const initialState = extractValues(targets, 'initialState');

  const namespaceReducer = function(state = initialState, action) {
    const { type } = action;
    if (type === trigger) {
      return reducer(state, action);
    } else if (type === TRIGGER_UNKNOWN) {
      if (isDev) {
        console.error('Targetable:', action.meta.exec, action.payload.message);
      }
    }

    return state;
  };

  return namespaceReducer;
}

export function createNamespaceObject(targets = {}, namespace) {
  return {
    [namespace]: createNamespace(targets, namespace)
  };
}
