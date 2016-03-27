import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore , applyMiddleware} from 'redux';
import netFinderApp from './reducers/mainReducer';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // 允许我们 dispatch() 函数
  loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
)(createStore);

export default createStoreWithMiddleware(netFinderApp);
