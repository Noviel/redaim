import { TRIGGER_UNKNOWN, TARGET_UNKNOWN, EXEC_UNKNOWN } from './constants';

export const createAction = 
  (trigger = TRIGGER_UNKNOWN) => 
  (target = TARGET_UNKNOWN) => 
  (action = {}) => {
  
  const { exec = EXEC_UNKNOWN, payload = null, meta = {}, ...rest } = action;

  return { 
    type: trigger, 
    meta: { target, exec, ...meta },
    payload,
    ...rest
  };
};

export const createActionR =
  (action = {}) =>
  (trigger = TRIGGER_UNKNOWN) =>
  (target = TARGET_UNKNOWN) => {
  
  const { exec = EXEC_UNKNOWN, payload = null, meta = {}, ...rest } = action;

  return {
    type: trigger,
    meta: { target, exec, ...meta },
    payload,
    ...rest
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

export const bindActions = actionCreatorWithTrigger => target => actions =>
  wrapActions(actionCreatorWithTrigger(target))(actions);

export const bindActionsR = actions => {
  const wrappedActions = wrapActionsR(actions);

  return trigger => { 
    const actionWithTrigger = createAction(trigger);

    return target => wrappedActions(actionWithTrigger(target));
  };
}

export const createActions = trigger => {
  const boundToTrigger = bindActions(createAction(trigger));

  return target => { 
    const boundToTarget = boundToTrigger(target);

    return actions => boundToTarget(actions);
  };
};

export const createActionsR = actions => {
  const withAction = bindActionsR(actions);

  return trigger => {
    const withTrigger = withAction(trigger);

    return target => withTrigger(target);
  };
};
