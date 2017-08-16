import createNamespace from './namespace';

export {
  aimFromAction,

  createAction, 
  createActionR,

  createActions,
  createActionsR, 

  bindActinos,
  bindActionsR, 
  
  wrapActions,
  wrapActionsR
} from './actions';

export { default as createTarget } from './target';
export { createNamespaceObject } from './namespace';

export default createNamespace;
