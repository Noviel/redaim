import { aimFromAction } from '../actions';

describe('aimFromAction', () => {
  it('should create default aim if no action provided', () => {
    expect(aimFromAction()).toMatchSnapshot();
  });

  it('should translate simple action type to trigger', () => {
    expect(aimFromAction({ type: 'SIMPLE' })).toMatchSnapshot();
  });

  it('should translate action type with \'/\' to trigger and target', () => {
    expect(aimFromAction({ type: 'TRIGGER/TARGET' })).toMatchSnapshot();
  });

  it('should translate action type with two \'/\'s to trigger, target and exec', () => {
    expect(aimFromAction({ type: 'TRIGGER/TARGET/EXEC' })).toMatchSnapshot();
  });

  it('should merge other fields', () => {
    expect(aimFromAction({ 
      type: 'TRIGGER/TARGET/EXEC', 
      otherField: {
        data: 100
      }
    })).toMatchSnapshot();
  });

  it('should merge payload', () => {
    expect(aimFromAction({ 
      type: 'TRIGGER/TARGET/EXEC', 
      payload: { field1: 100, field2: { complex: 200 }}
    })).toMatchSnapshot();
  });

  it('should merge existing meta fields', () => {
    expect(aimFromAction({ 
      type: 'TRIGGER/TARGET/EXEC', 
      meta: { field1: 100, field2: { complex: 200 }}
    })).toMatchSnapshot();
  });

  it('should merge existing meta fields not overriding exec and target from type', () => {
    expect(aimFromAction({ 
      type: 'TRIGGER/TARGET/EXEC', 
      meta: { target: 'WRONG_TARGET', exec: 'WRONG_EXEC', other: 'OK' }
    })).toMatchSnapshot();
  });
});
