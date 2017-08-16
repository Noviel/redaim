import {
  createAction,
  bindActions,
  bindActionsR
} from '../actions';

describe('bindActions', () => {
  it('should bind trigger to actions', () => {
    const actionsObject = {
      exec1: { exec: 'EXEC1', payload: { value: 1 } },
      exec2: { exec: 'EXEC2', payload: { value: 2 } },
      exec3: { exec: 'EXEC3', payload: { value: 3 } }
    };
    const boundActionsCreator = bindActions(createAction('MY_TRIGGER'))('MY_TARGET');
    const { exec1, exec2, exec3 } = boundActionsCreator(actionsObject);

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
    const boundActionsCreator = bindActions(createAction('MY_TRIGGER'))('MY_TARGET');
    const { exec1, exec2, exec3 } = boundActionsCreator(actionsObject);

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
    const boundActionsCreator = bindActionsR(actionsObject);
    const { exec1, exec2, exec3 } = boundActionsCreator('TRIGGER')('special_target');

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
    const boundActionsCreator = bindActionsR(actionsObject);
    const { exec1, exec2, exec3 } = boundActionsCreator('TRIGGER')('special_target');

    const result = {
      exec1: exec1().meta.target,
      exec2: exec2().meta.target,
      exec3: exec3().meta.target
    };

    expect(result).toMatchSnapshot();
  });
});
