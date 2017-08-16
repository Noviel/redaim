import getActions from './actions.js';
import getStore from './store.js';

const counterOneActions = getActions('counter1');
const counterTwoActions = getActions('counter2');

const store = getStore();

store.subscribe((s, a) => console.log(
  `Action:: 
    namespace/type: ${a.type} 
    target: ${a.meta && a.meta.target} 
    exec: ${a.meta && a.meta.exec}
Next state: ${JSON.stringify(s)}`));

console.log(counterOneActions.increment());

store.dispatch(counterOneActions.increment());
store.dispatch(counterTwoActions.decrement());
store.dispatch({ type: 'PLAIN_ACTION' });
store.dispatch(counterOneActions.increment());
store.dispatch(counterTwoActions.set(10));


