import { createActionR } from '../actions';

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
    const { type } = createActionR()()('ACTION_TRIGGER');

    expect(type).toMatchSnapshot();
  });

  it('should set action\'s meta.target', () => {
    const { meta: { target } } = createActionR()('ACTION_TRIGGER')('OK_TARGET');

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
      type: 'WRONG'
    })('OK')('target');

    expect(action.type).toMatchSnapshot();
  });

  it('should override action\'s target', () => {
    const action = createActionR({
      meta: { target: 'WRONG_TARGET' }
    })('TYPE_FROM_TRIGGER')('OK_TARGET');

    expect(action.meta.target).toMatchSnapshot();
  });

  it('should correctly merge custom action\'s properties', () => {
    const actionOne = createActionR({
      exec: 'MY_EXEC',
      customProp: {
        value: 42
      }
    })('MY_TRIGGER')('MY_TARGET');

    const actionTwo = createActionR({
      exec: 'MY_EXEC',
      payload: {
        data: 'payload-data'
      },
      meta: {
        val: 'meta-val'
      },
      customProp: {
        value: 42
      }
    })('MY_TRIGGER')('MY_TARGET');
    
    const toMatch = {
      actionOne,
      actionTwo
    };

    expect(toMatch).toMatchSnapshot();
  });

  it('should use exec from root', () => {
    const action = createActionR({
      exec: 'EXEC_FROM_ROOT',
      payload: { data: 10 },
      meta: {
        exec: 'EXEC_FROM_META',
        value: 100
      }
    })('TRIGGER')('TARGET');

    expect(action.meta.exec).toMatchSnapshot();
  });


});
