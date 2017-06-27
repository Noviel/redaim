import { extractValues, execSelector, createReducerWithHandlers } from '../helpers';

describe('extractValues', () => {

  it('should throw with not a string field', () => {
    expect(() => extractValues([], null))
      .toThrow();
  });

  it('should return an empty object if property is not exist', () => {
    const initial = [{ a: 1, b: { a: 2 }}, { a: 'second', z: 0 }];
    expect(extractValues(initial, 'nonExisted'))
      .toMatchSnapshot();
  });

  it('should properly extract fields from an array with empty objects', () => {
    const initial = [
      {},
      { a: 1, b: { a: 2 }}, 
      { a: 'second', z: 0 },
      {}
    ];
    expect(extractValues(initial, 'a'))
      .toMatchSnapshot();
  });

  it('should properly extract fields from an array', () => {
    const initial = [
      { a: 1, b: { a: 2 }}, 
      { a: 'second', z: 0 }
    ];
    expect(extractValues(initial, 'a'))
      .toMatchSnapshot();
  });

  it('should extract properties from an object', () => {
    const initial = {
      obj1: { a: 'from obj1', c: 2},
      obj2: { b: 4 },
      obj3: { a: 'from obj3'}
    };
    expect(extractValues(initial, 'a'))
      .toMatchSnapshot();
  });
});

describe('execSelector', () => {    
  const action = {
    meta: {
      exec: 'EXEC_VALUE'
    }
  };

  it('should properly select a key', () => {
    expect(execSelector(action))
      .toMatchSnapshot();
  });

  it('should return specific error string if key is not found in the action\'s meta', () => {
    const result = execSelector({
      meta: { }
    });

    expect(result)
      .toMatchSnapshot();
  });

  it('should return specific error string if meta is not found in an action', () => {
    const result = execSelector({ 
      type: 'TYPE', 
      payload: { value: 1 }
    });

    expect(result)
      .toMatchSnapshot();
  });
});

describe('createReducerWithHandlers', () => {
  const initialState = 'initalState';

  const actionOne = {
    meta: {
      exec: 'ACTION_1'
    }
  };

  const handlers = {
    'ACTION_0': (state, action) => 'one',
    'ACTION_1': (state, action) => 'two'
  };

  it('should return unmodified state if empty handlers', () => {
    const reducer = createReducerWithHandlers();

    expect(reducer(initialState, actionOne))
      .toMatchSnapshot();
  });

  it('should return unmodified state if handlers is not an object', () => {
    const reducer = createReducerWithHandlers(42);

    expect(reducer(initialState, actionOne))
      .toMatchSnapshot();
  });
  
  it('should properly take a key from an action with default keySelector', () => {
    const reducer = createReducerWithHandlers(handlers);

    expect(reducer(initialState, actionOne))
      .toMatchSnapshot();
  });

  it('should not modify the state if key is not found in handlers', () => {
    const reducer = createReducerWithHandlers(handlers);
    const actionNotMatch = {
      meta: {
        exec: 'ACTION_UNKNOWN'
      }
    };

    expect(reducer(initialState, actionNotMatch))
      .toMatchSnapshot();
  });

  it('should invoke correct handler with custom keySelector', () => {
    const keySelector = action => action.type;
    const reducer = createReducerWithHandlers(handlers, keySelector);

    expect(reducer(initialState, { type: 'ACTION_0' }))
      .toMatchSnapshot();
  });
});
