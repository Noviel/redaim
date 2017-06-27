# Redaim

Redaim - reusable actions and reducers for redux. Aim domain's target.

## Concepts

Add additional dimension for actions and reducers to specify where exactly on the state tree action should be applied.

## Install
```sh
yarn add redaim
``` 
or 
```sh
npm install redaim --save
```

## Usage

Redaim stands on several conceptual elements:
- Domain
- Target
- Exection (exec-action)

### Targets
Targets are reducers grouped in one namespace. Target can be created with `handlers` object by `createTarget`:

```javascript
// counter-target.js
import { createTarget } from 'redaim';

const counterHandlers = {
  INCREMENT: (state, action) => state + 1, 
  DECREMENT: (state, action) => state - 1,
  SET: (state, action) => action.payload
};

export default createTarget(counterHandlers);
```

Created target should be passed to namespace.

### Namespaces
Namespaces are reducers with targets. Namespace will take action and will pass it to corresponding target.

```javascript
// counters-namespace.js
import createNamespace from 'redaim';
import counterTarget from './counter-target';

const countersNamespace = createNamespace({
  counter1: counterTarget(0),
  counter2: counterTarget(100),
  counter3: counterTarget(-100)
}, 'COUNTERS');

export default countersNamespace;
```

Note that `counterTarget` is a function that takes `initialState` as an argument.

redaim namespace reducer can be used along side with any other reducers:

```javascript
// root-reducer.js
import { combineReducers } from 'redux';
import counterNamespace from './counters-namespace.js';

const rootReducer = combine({
  plain: myPlainReducer,
  counters: counterNamespace
});

export default rootReducer;
```

### Exec-actions

Differences from plain redux actions:
1. should have `exec` and `target` fields
2. `type` is used as a `trigger` to determine on which namespace it should be used

```javascript
// Simple redaim-action
const action = {
  type: 'COUNTERS',
  meta: {
    target: 'counter1',
    exec: 'INCREMENT'
  }
};
```
Same action can be created with `createAction`:

```javascript
import { createAction } from 'redaim';

const actionDescriptor = { exec: 'INCREMENT' };

// return [Function]
const withTrigger = createAction('COUNTERS');

// return [Function]
const withTriggerAndTarget = withTrigger('counter1');

// return final action object
const action = withTriggerAndTarget(actionDescriptor);
```
`createAction` is a higher-order function, so it can be bound to specific namespace and/or target.

To bind multiple actions can be used `createActions`:

```javascript
// actions.js
import { createActions } from 'redaim';

const actionsObject = {
  increment: { exec: 'INCREMENT' },
  decrement: { exec: 'DECREMENT' }
  // actions in action object could be functions.
  set: value => ({ exec: 'SET', payload: value }),
};

// we can hard bind to `COUNTERS` namespace if we are sure 
// that it is the only place where actions will be used
const countersActions = createActions('COUNTERS');

export default function getActions(target) {
  return countersActions(target)(actionsObject);
}
```

```javascript
// index.js
import getActions from './actions.js';
import getStore from './store.js';

const counterOneActions = getActions('counter1');
const counterTwoActions = getActions('counter2');
const store = getStore();

store.dispatch(counterOneActions.increment());
/* action:
{ 
  type: 'COUNTERS',
  meta: {
    exec: 'INCREMENT',
    target: 'counter1'
  }
}
*/

store.dispatch(counterTwoActions.set(10));
/* action:
{ 
  type: 'COUNTERS',
  meta: {
    exec: 'SET',
    target: 'counter2'
  },
  payload: 10
}
*/
```

## Examples

### [counter](https://github.com/Noviel/redaim/tree/master/src/example/counter)

## API

### Targets

#### createTarget
- signature :: handlers -> initialState -> { initialState, reducer }

### Namespaces

#### createNamespace
- signature :: (targets, trigger) -> reducer

#### createNamespaceObject
- signature :: (targets, namespace) -> { namespace: reducer }

### Exections

#### createAction
- signature :: string -> string -> { exec, payload, meta} -> { type, meta, payload }

#### wrapActions
- signature :: F (...args -> action) -> { ...action } -> { ...F(action) }

#### bindActions
- signature :: (F actionCreatorWithTrigger -> target -> { ...action }) -> { ...F(action) }

#### createActions
- signature :: string -> string -> { ...action } -> { ...action }
