import React from 'react';
import { connect } from 'react-redux';
import styles from './App.scss';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sidebar, content, all} = this.props;

    //let allDiv = all ? (<div className="home-main"> {all} </div>) : null;
    let sidebarDiv = sidebar ? (<div className="home-left">{sidebar}</div>) : null;
    let contentDiv = content ? (<div className="home-main">{content}</div>) : null;
    return (
      <div className="home">
        {sidebarDiv}
        {contentDiv}
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
