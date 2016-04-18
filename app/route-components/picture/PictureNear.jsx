import React,{ Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import styles from './PictureModule.scss';
import ScrollArea from 'react-scrollbar';
import { Link } from 'react-router'

const showFileMode = {
  GRAPH:'GRAPH',
  LIST:'LIST'
}

class PictureNear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFileMode: showFileMode.GRAPH
    };
  }

  changeShowFileMode(showFileMode) {
    var self = this;
    return () => {
      window.location.hash = `/${toHash}`;
      self.setState({
        showFileMode : showFileMode,
      })
    }
  }

  changeRouteTo(toHash) {
    return () => {
      window.location.hash = `/${toHash}`;
    }
  }

  render() {

    let isGraph = this.state.showFileMode === showFileMode.GRAPH? 'selected': '';
    let isList = this.state.showFileMode === showFileMode.LIST? 'selected': '';

    return (
      <div className="picture-module">
        <div className="header">
          <ul className="left-menu">
            <li  onClick={this.changeRouteTo("/picture/timeline")} >时光轴</li>
            <li className="selected" onClick={this.changeRouteTo("/picture/near")}>最近上传</li>
          </ul>
          <ul className="right-menu">
            <li><i className="iconfont icon">&#xe606;</i></li>
            <li ><i className="iconfont icon">&#xe605;</i></li>
            <li><i className="iconfont icon">&#xe607;</i></li>
          </ul>
        </div>

        <ScrollArea className="content" speed={0.8} horizontal={false} >


        </ScrollArea>
      </div>
    )
  }
}


function select(state) {
  return state;
}

export default connect(select)(PictureNear);
