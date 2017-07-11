import createNamespace from './namespace';

export { createNamespaceObject } from './namespace';

export { 
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

export default createNamespace;
