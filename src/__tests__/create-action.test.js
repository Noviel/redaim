import { createAction } from '../actions';

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
    const v = createAction('OK_TYPE')()();

    expect(v.type).toMatchSnapshot();
  });

  it('should set action\'s meta.target', () => {
    const a = createAction('ACTION_TRIGGER')('OK_TARGET')();

    expect(a.meta.target).toMatchSnapshot();
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
    const action = createAction('OK')('target')({
      type: 'WRONG'
    });

    expect(action.type).toMatchSnapshot();
  });

  it('should override action\'s target', () => {
    const action = createAction('TYPE_FROM_TRIGGER')('OK_TARGET')({
      meta: { target: 'WRONG_TARGET' }
    });

    expect(action.meta.target).toMatchSnapshot();
  });

  it('should correctly merge custom action\'s properties', () => {
    const actionOne = createAction('MY_TRIGGER')('MY_TARGET')({
      exec: 'MY_EXEC',
      customProp: {
        value: 42
      }
    });

    const actionTwo = createAction('MY_TRIGGER')('MY_TARGET')({
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
    });
    
    const toMatch = {
      actionOne,
      actionTwo
    };

    expect(toMatch).toMatchSnapshot();
  });

  it('should use exec from root', () => {
    const action = createAction('TRIGGER')('TARGET')({
      exec: 'EXEC_FROM_ROOT',
      payload: { data: 10 },
      meta: {
        exec: 'EXEC_FROM_META',
        value: 100
      }
    });

    expect(action.meta.exec).toMatchSnapshot();
  });

});
