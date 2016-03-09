import React,{ Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import styles from './MusicModule.scss';
import ScrollArea from 'react-scrollbar';
import classNames from 'classnames';

const showFileMode = {
  GRAPH:'GRAPH',
  LIST:'LIST'
}

class MusicModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false
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

  playMusic(){
    this.setState({isPlay: true});
    this.refs.audio.play();
  }

  pauseMusic() {
    this.setState({isPlay: false});
    this.refs.audio.pause();
  }


  render() {

    let isGraph = this.state.showFileMode === showFileMode.GRAPH? 'selected': '';
    let isList = this.state.showFileMode === showFileMode.LIST? 'selected': '';

    return (
      <div className="music-module">
        <div className="header">
          <ul className="left-menu">
             <li className={isGraph} onClick={this.changeShowFileMode(showFileMode.GRAPH)} >时光轴</li>
             <li className={isList} onClick={this.changeShowFileMode(showFileMode.LIST)}>最近上传</li>
          </ul>
          <ul className="right-menu">
            <li><i className="iconfont icon">&#xe606;</i></li>
            <li ><i className="iconfont icon">&#xe605;</i></li>
            <li><i className="iconfont icon">&#xe607;</i></li>
          </ul>
        </div>

        <ScrollArea className="content" speed={0.8} horizontal={false} >
          <div className="music-info">
            <img className="cover" src="http://localhost:3000/files/1.jpg"/>
            <p className="name">
              借我-谢春花
            </p>
          </div>
          <div className={classNames('music-control', {playing: this.state.isPlay})}>
            <i className="iconfont prev-music" onClick={this.playMusic.bind(this)}>&#xe614;</i>
            <i className="iconfont play" onClick={this.playMusic.bind(this)}>&#xe611;</i>
            <i className="iconfont pause" onClick={this.pauseMusic.bind(this)}>&#xe612;</i>
            <i className="iconfont next-music" onClick={this.playMusic.bind(this)}>&#xe613;</i>
          </div>
          <audio ref="audio">
             <source src="http://localhost:3000/files/谢春花 - 借我-demo.mp3" />
             <source src="http://localhost:3000/files/谢春花 - 荒岛.mp3" />
          </audio>

        </ScrollArea>
      </div>
    )
  }
}


function select(state) {
  return state;
}

export default connect(select)(MusicModule);
