
import React from 'react';
import { connect } from 'react-redux';

class PictureModule extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/faassen/reselect 效果更佳。
function select(state) {
  return state;
}

export default connect(select)(PictureModule);
