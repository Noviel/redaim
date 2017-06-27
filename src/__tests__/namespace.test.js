import createTarget from '../target';
import createNamespace, { createNamespaceObject } from '../namespace';

describe('createNamespace', () => {
  const targetReducer = createTarget({
    'ADD': (state, action) => state + action.payload,
    'SUB': (state, action) => state - action.payload
  });

  const action = (target, exec, payload, type = 'TRIGGER') => ({
    type,
    meta: {
      exec,
      target
    },
    payload
  });

  it('should return a function', () => {
    const result = createNamespace({}, 'TRIGGER');

    expect(typeof result).toMatchSnapshot();
  });

  it('should throw an error with not a string trigger', () => {
    expect(() => {
      createNamespace({}, undefined);
    }).toThrow();
  });

  it('should not modify state with not corresponding action type', () => {
    const ns = createNamespace({
      targetOne: targetReducer(5),
      targetTwo: targetReducer(-100)
    }, 'TRIGGER');

    let state = ns(undefined, action('targetOne', 'ADD', 5, 'SOME_OTHER_ACTION_TYPE'));
    state = ns(state, action('targetTwo', 'SUB', 5, 'SOME_OTHER_ACTION_TYPE'));

    const toMatch = [state.targetOne, state.targetTwo];

    expect(toMatch).toMatchSnapshot();
  });

  it('should not modify state if target is not in namespace', () => {
    const ns = createNamespace({
      targetOne: targetReducer(5),
      targetTwo: targetReducer(-100)
    }, 'TRIGGER');

    const state = ns(undefined, action('targetUnknown', 'ADD', 5));

    const toMatch = [state.targetOne, state.targetTwo];

    expect(toMatch).toMatchSnapshot();
  });

  it('should apply actions to correct target', () => {
    const ns = createNamespace({
      targetOne: targetReducer(5),
      targetTwo: targetReducer(-100)
    }, 'TRIGGER');

    let state = ns(undefined, action('targetOne', 'ADD', 5));
    state = ns(state, action('targetTwo', 'SUB', 5));

    const toMatch = [state.targetOne, state.targetTwo];

    expect(toMatch).toMatchSnapshot();
  });  
});

describe('createNamespaceObject', () => {
  it('should return object with namespace as a key', () => {
    const namespaceObj = createNamespaceObject({}, 'TRIGGER');

    expect(Object.keys(namespaceObj)).toMatchSnapshot();
  });
});
