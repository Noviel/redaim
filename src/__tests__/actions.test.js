import { 
  createAction,
  createActionR,
  
  wrapActions,
  
  createActions,
  createActionsR,
  
  bindActions,
  bindActionsR

} from '../actions';

describe('createAction', () => {  
  
  it('should return function when called once', () => {
    expect(typeof createAction()).toMatchSnapshot();
  });

  it('should return function when called twice', () => {
    expect(typeof createAction()()).toMatchSnapshot();
  });  
  
  it('should return object when called thrice', () => {
    expect(typeof createAction()()()).toMatchSnapshot();
  });

  it('should set trigger to default value if not specified', () => {
    const { type } = createAction()()();
    
    expect(type).toMatchSnapshot();
  });

  it('should set target to default value if not specified', () => {
    const { meta: { target } } = createAction()()();
    
    expect(target).toMatchSnapshot();
  });

  it('should set exec to default value if not specified', () => {
    const { meta: { exec } } = createAction()()();
    
    expect(exec).toMatchSnapshot();
  });

  it('should set action\'s type', () => {
    const { type } = createAction('ACTION_TRIGGER')()();

    expect(type).toMatchSnapshot();
  });

  it('should set action\'s meta.target', () => {
    const { meta: { target } } = createAction('ACTION_TRIGGER')('target')();

    expect(target).toMatchSnapshot();
  });

  it('should correctly merge action\'s properties', () => {
    const action = createAction('ACTION_TRIGGER')('target')({ 
      exec: 'EXEC_TYPE',
      payload: { data: 10 },
      meta: {
        obj: {
          inner: 10
        },
        value: 100
      }
    });

    expect(action).toMatchSnapshot();
  });

  it('should override action\'s type', () => {
    const action = createAction('TYPE_FROM_TRIGGER')('target')({
      type: 'TYPE_OVERRIDE'
    });

    expect(action.type).toMatchSnapshot();
  });

  it('should override action\'s target', () => {
    const action = createAction('TYPE_FROM_TRIGGER')('target')({
      meta: { target: 'target_override' }
    });

    expect(action.meta.target).toMatchSnapshot();
  });

  it('should correctly merge custom action\'s properties', () => {
    const actionOne = createAction()()({
      customProp: {
        value: 42
      }
    });

    const actionTwo = createAction()()({
      payload: {
        data: 'payload-data'
      },
      meta: {
        val: 'meta-val'
      },
      customProp: {
        value: 42
      }
    });
    
    const toMatch = {
      actionOne,
      actionTwo
    };

    expect(toMatch).toMatchSnapshot();
  });

});

describe('createActionR', () => {  
  
  it('should return function when called once', () => {
    expect(typeof createActionR()).toMatchSnapshot();
  });

  it('should return function when called twice', () => {
    expect(typeof createActionR()()).toMatchSnapshot();
  });  
  
  it('should return object when called thrice', () => {
    expect(typeof createActionR()()()).toMatchSnapshot();
  });

  it('should set trigger to default value if not specified', () => {
    const { type } = createActionR()()();
    
    expect(type).toMatchSnapshot();
  });

  it('should set target to default value if not specified', () => {
    const { meta: { target } } = createActionR()()();
    
    expect(target).toMatchSnapshot();
  });

  it('should set exec to default value if not specified', () => {
    const { meta: { exec } } = createActionR()()();
    
    expect(exec).toMatchSnapshot();
  });

  it('should set action\'s type', () => {
    const { type } = createActionR()('ACTION_TRIGGER')();

    expect(type).toMatchSnapshot();
  });

  it('should set action\'s meta.target', () => {
    const { meta: { target } } = createActionR()('ACTION_TRIGGER')('target');

    expect(target).toMatchSnapshot();
  });

  it('should correctly merge action\'s properties', () => {
    const action = createActionR({ 
      exec: 'EXEC_TYPE',
      payload: { data: 10 },
      meta: {
        obj: {
          inner: 10
        },
        value: 100
      }
    })('ACTION_TRIGGER')('target');

    expect(action).toMatchSnapshot();
  });

  it('should override action\'s type', () => {
    const action = createActionR({
      type: 'TYPE_OVERRIDE'
    })('TYPE_FROM_TRIGGER')('target');

    expect(action.type).toMatchSnapshot();
  });

  it('should override action\'s target', () => {
    const action = createActionR({
      meta: { target: 'target_override' }
    })('TYPE_FROM_TRIGGER')('target');

    expect(action.meta.target).toMatchSnapshot();
  });

  it('should correctly merge custom action\'s properties', () => {
    const actionOne = createActionR({
      customProp: {
        value: 42
      }
    })()();

    const actionTwo = createActionR({
      payload: {
        data: 'payload-data'
      },
      meta: {
        val: 'meta-val'
      },
      customProp: {
        value: 42
      }
    })()();
    
    const toMatch = {
      actionOne,
      actionTwo
    };

    expect(toMatch).toMatchSnapshot();
  });

});

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

describe('createActions', () => {
  it('should create actions from object with object as values', () => {
    const actionsObject = {
      exec1: { exec: 'EXEC1', payload: { value: 1 } },
      exec2: { exec: 'EXEC2', payload: { value: 2 } },
      exec3: { exec: 'EXEC3', payload: { value: 3 } }
    };

    const { exec1, exec2, exec3 } = createActions('TRIGGER')('target')(actionsObject);

    const result = {
      exec1: exec1(),
      exec2: exec2(),
      exec3: exec3()
    };

    expect(result).toMatchSnapshot();
  });

  it('should create actions from object with functions as values', () => {
    const actionsObject = {
      exec1: value => ({ exec: 'EXEC1', payload: { value } }),
      exec2: (value1, value2) => ({ exec: 'EXEC2', payload: { value1, value2 } }),
    };

    const { exec1, exec2 } = createActions('TRIGGER')('target')(actionsObject);

    const result = {
      exec1: exec1(100),
      exec2: exec2({ value: 'value'}, 420),
    };

    expect(result).toMatchSnapshot();
  });

  it('should create actions from object with mixed values', () => {
    const actionsObject = {
      exec1: value => ({ exec: 'EXEC1', payload: { value } }),
      exec2: { exec: 'EXEC2', payload: 'payload' },
    };

    const { exec1, exec2 } = createActions('TRIGGER')('target')(actionsObject);

    const result = {
      exec1: exec1('exec1-value'),
      exec2: exec2(),
    };

    expect(result).toMatchSnapshot();
  });
});

describe('createActionsR', () => {
  it('should create actions from object with object as values', () => {
    const actionsObject = {
      exec1: { exec: 'EXEC1', payload: { value: 1 } },
      exec2: { exec: 'EXEC2', payload: { value: 2 } },
      exec3: { exec: 'EXEC3', payload: { value: 3 } }
    };

    const { exec1, exec2, exec3 } = createActionsR(actionsObject)('TRIGGER')('target');

    const result = {
      exec1: exec1(),
      exec2: exec2(),
      exec3: exec3()
    };

    expect(result).toMatchSnapshot();
  });

  it('should create actions from object with functions as values', () => {
    const actionsObject = {
      exec1: value => ({ exec: 'EXEC1', payload: { value } }),
      exec2: (value1, value2) => ({ exec: 'EXEC2', payload: { value1, value2 } }),
    };

    const { exec1, exec2 } = createActionsR(actionsObject)('TRIGGER')('target');

    const result = {
      exec1: exec1(100),
      exec2: exec2({ value: 'value'}, 420),
    };

    expect(result).toMatchSnapshot();
  });

  it('should create actions from object with mixed values', () => {
    const actionsObject = {
      exec1: value => ({ exec: 'EXEC1', payload: { value } }),
      exec2: { exec: 'EXEC2', payload: 'payload' },
    };

    const { exec1, exec2 } = createActionsR(actionsObject)('TRIGGER')('target');

    const result = {
      exec1: exec1('exec1-value'),
      exec2: exec2(),
    };

    expect(result).toMatchSnapshot();
  });
});

describe('bindActions', () => {
  it('should bind trigger to actions', () => {
    const actionsObject = {
      exec1: { exec: 'EXEC1', payload: { value: 1 } },
      exec2: { exec: 'EXEC2', payload: { value: 2 } },
      exec3: { exec: 'EXEC3', payload: { value: 3 } }
    };

    const { exec1, exec2, exec3 } = bindActions(createAction('TRIGGER'))('special_target')(actionsObject);

    const result = {
      exec1: exec1().type,
      exec2: exec2().type,
      exec3: exec3().type
    };

    expect(result).toMatchSnapshot();
  });

  it('should bind target to actions', () => {
    const actionsObject = {
      exec1: { exec: 'EXEC1', payload: { value: 1 } },
      exec2: { exec: 'EXEC2', payload: { value: 2 } },
      exec3: { exec: 'EXEC3', payload: { value: 3 } }
    };

    const { exec1, exec2, exec3 } = bindActions(createAction('TRIGGER'))('special_target')(actionsObject);

    const result = {
      exec1: exec1().meta.target,
      exec2: exec2().meta.target,
      exec3: exec3().meta.target
    };

    expect(result).toMatchSnapshot();
  });
});

describe('bindActionsR', () => {
  it('should bind trigger to actions', () => {
    const actionsObject = {
      exec1: { exec: 'EXEC1', payload: { value: 1 } },
      exec2: { exec: 'EXEC2', payload: { value: 2 } },
      exec3: { exec: 'EXEC3', payload: { value: 3 } }
    };
    const { exec1, exec2, exec3 } = bindActionsR(actionsObject)('TRIGGER')('special_target');

    const result = {
      exec1: exec1().type,
      exec2: exec2().type,
      exec3: exec3().type,
    };

    expect(result).toMatchSnapshot();
  });

  it('should bind target to actions', () => {
    const actionsObject = {
      exec1: { exec: 'EXEC1', payload: { value: 1 } },
      exec2: { exec: 'EXEC2', payload: { value: 2 } },
      exec3: { exec: 'EXEC3', payload: { value: 3 } }
    };

    const { exec1, exec2, exec3 } = bindActionsR(actionsObject)('TRIGGER')('special_target');

    const result = {
      exec1: exec1().meta.target,
      exec2: exec2().meta.target,
      exec3: exec3().meta.target
    };

    expect(result).toMatchSnapshot();
  });
});
