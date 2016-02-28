import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import App from './route-components/App';
import Menus from './route-components/Menus';
import AllFile from './route-components/AllFile';
import store from './mainStores';
import Picture from './route-components/picture/PictureModule';

// // 监听 state 更新时，打印日志
// // 注意 subscribe() 返回一个函数用来注销监听器
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );
//
// // 停止监听 state 更新
// // unsubscribe();

// polyfill
if(!Object.assign)
  Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle

module.exports = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute components={{sidebar: Menus, content: AllFile}}/>
        <Route path="all" components={{sidebar: Menus, content: AllFile}}></Route>
        <Route path="picture" components={{sidebar: Menus, content: Picture}}></Route>
        <Route path="music" components={{sidebar: Menus, content: null}}></Route>
        <Route path="other" components={{sidebar: Menus, content: null}}></Route>
      </Route>
    </Router>
  </Provider>
)
