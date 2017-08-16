import { wrapActions } from '../actions';

describe('wrapActions', () => {
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
    const result = wrapActions(identity)(actions);
    const keys = Object.keys(result);

    expect(keys).toMatchSnapshot();
  });

  it('should return object with functions', () => {
    const result = wrapActions(identity)(actions);
    const keys = Object.keys(result);
    
    const toMatch = keys.reduce((acc, curr) => { 
      acc[curr] = typeof result[curr]; 
      return acc; 
    }, {});

    expect(toMatch).toMatchSnapshot();
  });

  it('should correctly apply function without arguments to each action', () => {
    const addConstant = action => ({ ...action, payload: 42 });
    const wrappedActions = wrapActions(addConstant)(actions);

    const wrappedActionOne = wrappedActions['ACTION_ONE']();
    const wrappedActionTwo = wrappedActions['ACTION_TWO']();

    expect({ wrappedActionOne, wrappedActionTwo }).toMatchSnapshot();
  });

  it('should correctly apply function with one argument to each action', () => {
    const addPayload = (action, payload) => ({ ...action, payload });
    const wrappedActions = wrapActions(addPayload)(actions);

    const wrappedActionOne = wrappedActions['ACTION_ONE'](10);
    const wrappedActionTwo = wrappedActions['ACTION_TWO']({ value: { inner: { innerValue: 100 }}});

    expect({ wrappedActionOne, wrappedActionTwo }).toMatchSnapshot();
  });

  it('should correctly apply function with multiple arguments to each action', () => {
    const addOneTwoToPayload = (action, one, two) => ({ ...action, payload: { one, two } });
    const wrappedActions = wrapActions(addOneTwoToPayload)(actions);

    const wrappedActionOne = wrappedActions['ACTION_ONE'](1, 'two');
    const wrappedActionTwo = wrappedActions['ACTION_TWO']({ value: { inner: { innerValue: 100 }}}, null);

    expect({ wrappedActionOne, wrappedActionTwo }).toMatchSnapshot();
  });

});
