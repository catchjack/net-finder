import React,{ Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import styles from './PictureModule.scss';
import ScrollArea from 'react-scrollbar';
import { Link } from 'react-router'

const showFileMode = {
  GRAPH:'GRAPH',
  LIST:'LIST'
}

class PictureTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFileMode: showFileMode.GRAPH
    };
  }

  changeShowFileMode(showFileMode) {
    var self = this;
    return () => {

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

    return (
      <div className="picture-module">
        <div className="header">
          <ul className="left-menu">
            <li className="selected" onClick={this.changeRouteTo("/picture/timeline")} >时光轴</li>
            {/* <li onClick={this.changeRouteTo("/picture/near")}>最近上传</li>*/}
          </ul>
          <ul className="right-menu">
            <li><i className="iconfont icon">&#xe606;</i></li>
            <li ><i className="iconfont icon">&#xe605;</i></li>
            <li><i className="iconfont icon">&#xe607;</i></li>
          </ul>
        </div>

        <ScrollArea className="content" speed={0.8} horizontal={false} >
          <div className="timeline-wrap">
            <div className="timeline-top">
              <span className="date">2016年04月17日</span>
            </div>
            <ul className="timeline-content">
              <li className="file-item">
                <div className="mask"></div><img src="http://localhost:3000/files/1.jpg"/>
              </li>
              <li className="file-item">
                <div className="mask"></div><img src="http://localhost:3000/files/076b4d99a0439d13b14fd9b33f631474_1459412732000.jpeg"/>
              </li>
              <li className="file-item">
                <div className="mask"></div><img src="http://localhost:3000/files/076b4d99a0439d13b14fd9b33f631474_1459412732000.jpeg"/>
              </li>
              <li className="file-item">
                <div className="mask"></div><img src="http://localhost:3000/files/255ef445c2fc048011a13c4cb4afe515_1459412739000.jpg"/>
              </li>

            </ul>
          </div>

          <div className="timeline-wrap">
            <div className="timeline-top">
              <span className="date">2016年04月16日</span>
            </div>
            <ul className="timeline-content">
              <li className="file-item">
                <div className="mask"></div><img src="http://localhost:3000/files/69ccb950c146c396d3f2e41663adf27b_1459873568000.jpeg"/>
              </li>
              <li className="file-item">
                <div className="mask"></div><img src="http://localhost:3000/files/255ef445c2fc048011a13c4cb4afe515_1459412739000.jpg"/>
              </li>
              <li className="file-item">
                <div className="mask"></div><img src="http://localhost:3000/files/076b4d99a0439d13b14fd9b33f631474_1459412732000.jpeg"/>
              </li>

            </ul>
          </div>

        </ScrollArea>
      </div>
    )
  }
}


function select(state) {
  return state;
}

export default connect(select)(PictureTimeline);
