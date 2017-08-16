import { createNamespaceObject } from '../../index';
import counterTarget from './counter-target';

export default createNamespaceObject({
  counter1: counterTarget(0),
  counter2: counterTarget(100),
  counter3: counterTarget(-100)
}, 'COUNTERS');
