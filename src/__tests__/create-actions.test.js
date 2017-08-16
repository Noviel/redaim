import {  
  createActions,
  createActionsR,
} from '../actions';

describe('createActions', () => {
  it('should create actions from object with objects as values', () => {
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
