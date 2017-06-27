import createTarget from '../target';

describe('createTarget', () => {
  it('should return correct object with default properties', () => {
    const result = createTarget()();

    const toMatch = {
      initialState: result.hasOwnProperty('initialState'),
      reducer: result.hasOwnProperty('reducer')
    };

    expect(toMatch).toMatchSnapshot();
  });

  it('should set initialState', () => {
    const result = createTarget()({ value: 'initialValue' });

    expect(result.initialState).toMatchSnapshot();
  });

  it('should set reducer', () => {
    const { reducer } = createTarget({
      'ACTION': (state, action) => state + 1
    })();

    const toMatch = {
      state: reducer(100, { meta: { exec: 'ACTION' } })
    };
    
    expect(toMatch).toMatchSnapshot();
  });  
});
