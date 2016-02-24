import React from 'react';
import { connect } from 'react-redux';
import styles from './App.scss';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sidebar, content} = this.props;
    return (
      <div className="home">
        <div className="home-left">
          { sidebar }
        </div>
        <div className="home-main">
          { content }
        </div>
      </div>
    )
  }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/faassen/reselect 效果更佳。
function select(state) {
  return state;
}

export default connect(select)(App);
