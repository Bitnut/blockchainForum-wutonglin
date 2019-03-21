import {
  createStore,
  applyMiddleware
} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
//import {perSistStore, autoRehydrate} from 'redux-persist';

// log 中间件，监视触发的action和state变化
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log('dispatching', action);
  }
  let result = next(action);
  console.log('next state:', store.getState());
  return result;
}
let middlewares = [
  logger,
  thunk
];

const configureStore = () => createStore(reducer, applyMiddleware(...middlewares));

export default configureStore;