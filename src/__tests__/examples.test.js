import { createAction, createActions } from '../actions';

describe('create actions examples', () => {
  it('should return correct action', () => {
    const action = createAction('COUNTERS_TRIGGER')('counter1')({
      exec: 'ADD',
      meta: { additionalMetaField: 42 },
      payload: { value: 100 }
    });

    expect(action).toMatchSnapshot();
  });

  it('should create actions from action object with functions as keys', () => {
    const actionsObject = {
      add: { exec: 'ADD', payload: { value: 100 } },
      sub: value => ({ exec: 'SUB', payload: { value } })
    };

    const { add, sub } = createActions('COUNTER_TRIGGER')('counter1')(actionsObject);

    const result = {
      add: add(),
      sub: sub(10)
    };

    expect(result).toMatchSnapshot();
  });
});
