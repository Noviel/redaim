import { wrapActionsR } from '../actions';

describe('wrapActionsR', () => {
  const actions = {
    'ACTION_ONE': {
      type: 'ACTION_ONE'
    },
    'ACTION_TWO': {
      type: 'ACTION_TWO'
    }
  };

  const identity = x => x;

  it('should return object with same keys as an input action', () => {
    const result = wrapActionsR(actions)(identity);
    const keys = Object.keys(result);

    expect(keys).toMatchSnapshot();
  });

  it('should return object with functions', () => {
    const result = wrapActionsR(actions)(identity);
    const keys = Object.keys(result);
    
    const toMatch = keys.reduce((acc, curr) => { 
      acc[curr] = typeof result[curr]; 
      return acc; 
    }, {});

    expect(toMatch).toMatchSnapshot();
  });

  it('should correctly apply function without arguments to each action', () => {
    const addConstant = action => ({ ...action, payload: 42 });
    const wrappedActions = wrapActionsR(actions)(addConstant);

    const wrappedActionOne = wrappedActions['ACTION_ONE']();
    const wrappedActionTwo = wrappedActions['ACTION_TWO']();

    expect({ wrappedActionOne, wrappedActionTwo }).toMatchSnapshot();
  });

  it('should correctly apply function with one argument to each action', () => {
    const addPayload = (action, payload) => ({ ...action, payload });
    const wrappedActions = wrapActionsR(actions)(addPayload);

    const wrappedActionOne = wrappedActions['ACTION_ONE'](10);
    const wrappedActionTwo = wrappedActions['ACTION_TWO']({ value: { inner: { innerValue: 100 }}});

    expect({ wrappedActionOne, wrappedActionTwo }).toMatchSnapshot();
  });

  it('should correctly apply function with multiple arguments to each action', () => {
    const addOneTwoToPayload = (action, one, two) => ({ ...action, payload: { one, two } });
    const wrappedActions = wrapActionsR(actions)(addOneTwoToPayload);

    const wrappedActionOne = wrappedActions['ACTION_ONE'](1, 'two');
    const wrappedActionTwo = wrappedActions['ACTION_TWO']({ value: { inner: { innerValue: 100 }}}, null);

    expect({ wrappedActionOne, wrappedActionTwo }).toMatchSnapshot();
  });

});
