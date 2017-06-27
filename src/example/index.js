const { createStore, combine } = require('./lib/redux');
const { createNamespaceObject, createTarget, createActions } = require('../index');

const stringHandlers = {
  'add': (state, { payload: { value, index } }) => {
    return state.slice(0, index) + value + state.slice(index);
  }, 

  'remove': (state, { payload: { value, once } }) => {
    return state.replace(value, '');
  },
};

const initialState = {
  h1: 'vanilla initial state'
};

const hReducer = createTarget(stringHandlers);

const nsp = n => createNamespaceObject({
  h1: hReducer('t2h1'),
  h2: hReducer('t2h2')
}, n);

const store = createStore(initialState, combine({ 
  h1: (state, action) => {
    if (action.type === 'VANILLA_ACTION') {
      return state + ' vanilla';
    }

    return state;
  },
  ...nsp('t1'),
  ...nsp('t2')
}));


const _add = (value, index) => ({
  exec: 'add',
  payload: { value, index}
});

const _remove = value => ({
  exec: 'remove',
  payload: { value }
});

const actionsFor = namespace => target => 
  createActions(namespace)(target)({ add: _add, remove: _remove });

const t2h1A = actionsFor('t2')('h1');

console.log(t2h1A.add('!!!!!!!!!!', 0));

store.subscribe(s => console.log(`Next state: ${JSON.stringify(s)}`));

store.dispatch(t2h1A.add('[INSERTED]', 0));
store.dispatch(t2h1A.add('[ME TO]', 0));
store.dispatch(t2h1A.remove(/E/g));

store.dispatch({ type: 'VANILLA_ACTION' });
store.dispatch({ type: 'VANILLA_ACTION' });
