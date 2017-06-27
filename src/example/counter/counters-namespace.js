import createNamespace from '../../index';
import counterTarget from './counter-target';

const countersNamespace = createNamespace({
  counter1: counterTarget(0),
  counter2: counterTarget(100),
  counter3: counterTarget(-100)
}, 'COUNTERS');

export default countersNamespace;
