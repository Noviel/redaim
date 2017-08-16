import { TRIGGER_UNKNOWN, TARGET_UNKNOWN, EXEC_UNKNOWN } from './constants';

export const createAction = 
  (trigger = TRIGGER_UNKNOWN) => 
  (target = TARGET_UNKNOWN) => 
  ({ exec = EXEC_UNKNOWN, payload = null, meta, ...rest } = {}) => 
({
  ...rest,
  type: trigger,
  payload,
  meta: {
    ...meta,
    target: target,
    exec
  }
});

export const aimFromAction = ({ type = '', payload = null, meta, ...rest } = {}) => {
  const [ 
    trigger = TRIGGER_UNKNOWN, 
    target = TARGET_UNKNOWN, 
    exec = EXEC_UNKNOWN 
  ] = type.split('/');

  return {
    ...rest,
    type: trigger || TRIGGER_UNKNOWN,
    payload,
    meta: {
      ...meta,
      target: target || TARGET_UNKNOWN,
      exec: exec || EXEC_UNKNOWN
    }
  };
};

export const wrapActions = fn => actions => {
  const finalActions = {};
  
  for (const a in actions) {
    const currAction = actions[a];
    if (typeof currAction === 'function') {
      finalActions[a] = (...args) => fn(currAction(...args));
    } else {
      finalActions[a] = (...args) => fn(currAction, ...args);
    }
  }

  return finalActions;
};

export const bindActions = actionCreatorWithTrigger => target => actions =>
  wrapActions(actionCreatorWithTrigger(target))(actions);
  
export const createActions = trigger => {
  const boundToTrigger = bindActions(createAction(trigger));

  return target => { 
    const boundToTarget = boundToTrigger(target);

    return actions => boundToTarget(actions);
  };
};

// reversed order of arguments
  
export const createActionR =
  ({ exec = EXEC_UNKNOWN, payload, meta, ...rest } = {}) =>
  (trigger = TRIGGER_UNKNOWN) =>
  (target = TARGET_UNKNOWN) =>
({
  ...rest,
  type: trigger,
  payload,
  meta: {
    ...meta,
    target: target,
    exec
  }
});

export const wrapActionsR = actions => fn => {
  const finalActions = {};
  
  for (const a in actions) {
    const currAction = actions[a];
    if (typeof currAction === 'function') {
      finalActions[a] = (...args) => fn(currAction(...args));
    } else {
      finalActions[a] = (...args) => fn(currAction, ...args);
    }
  }

  return finalActions;
};

export const bindActionsR = actions => {
  const wrappedActions = wrapActionsR(actions);

  return trigger => { 
    const actionAimer = createAction(trigger);

    return target => wrappedActions(actionAimer(target));
  };
};

export const createActionsR = actions => {
  const withAction = bindActionsR(actions);

  return trigger => {
    const withTrigger = withAction(trigger);

    return target => withTrigger(target);
  };
};
