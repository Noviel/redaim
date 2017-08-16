import { createActionsR } from '../../index';

const actionsObject = {
  increment: { exec: 'INCREMENT' },
  decrement: { exec: 'DECREMENT' },
  // actions in action object could be functions.
  set: value => ({ exec: 'SET', payload: value }),
};

// we can hard bind to `COUNTERS` namespace if we are sure 
// that it is the only place where actions will be used
const countersActions = createActionsR(actionsObject);

export default function getActions(target) {
  return countersActions('COUNTERS')(target);
}
