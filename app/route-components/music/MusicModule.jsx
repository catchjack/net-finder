import React,{ Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import styles from './MusicModule.scss';
import ScrollArea from 'react-scrollbar';
import classNames from 'classnames';
import {fetchMusicList} from '../../actions/getMusic';
import {Howl} from 'howler';

const showFileMode = {
  GRAPH:'GRAPH',
  LIST:'LIST'
}

class MusicModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isPause: false,
      musicIndex: 0,
      isLoading: false,
      volume: 0.5,
      musicList: []
    };
  }

  play(){

    this.setState({ isPlaying: true, isPause: false });

    if (!this.howler) {
      this.initHowl();
    } else {
      var songUrl = this.state.musicList[this.state.musicIndex].uri;
      if (songUrl != this.howler._src) {
        this.initHowl();
      } else {
        this._play();
      }
    }
  }

  initHowl() {
    this.clearHowl();
    var song = this.state.musicList[this.state.musicIndex];
    this.howler = new Howl({
      src: [song.uri],
      html5: true,
      volume: this.state.volume,
      onload: this.initHowlCompleted.bind(this),
      onloaderror: (err) => {
        console.log(err);
      },
      onend: this.playEnd.bind(this)
    })
  }

  clearHowl() {
    if(this.howler) {
      this.howler.stop();
      this.howler = null;
    }
  }

  playEnd() {
    if(this.state.musicIndex == this.state.musicList.length - 1) {
      this.stop();
    } else {
      this.next();
    }
  }

  stop() {
    this.setState({seek: 0, isPlaying: false});
  }

  pause() {
    this.howler.pause();
    this.setState({ isPlaying: false, isPause: true });
  }

  prev() {
    this.updateSongIndex((this.state.musicIndex + this.state.musicList.length - 1 )% this.state.musicList.length);
  }

  next() {
    this.updateSongIndex((this.state.musicIndex + 1 )% this.state.musicList.length);
  }

  updateSongIndex(index) {
    this.setState({
      musicIndex: index,
      duration: 0
    });
    setTimeout(() => {
      this.play();
    }, 0)
  }

  _play() {
    this.howler.play();
  }

  initHowlCompleted() {
    this._play();
    this.setState({
      duration: 0,
      isLoading: false
    });
  }


  componentDidMount() {
    this.props.dispatch(fetchMusicList(()=> {
      this.setState({
        musicList: this.props.music.items,
        musicIndex: 0
      });

      this.clearHowl();
    }));
  }

  changeShowFileMode(showFileMode) {
    var self = this;
    return () => {
      self.setState({
        showFileMode : showFileMode,
      })
    }
  }


  render() {

    let musicList = this.state.musicList.map(music => {
      return (<source key={music._id} src={music.uri} title={music.name}/>);
    })
    let isGraph = this.state.showFileMode === showFileMode.GRAPH? 'selected': '';
    let isList = this.state.showFileMode === showFileMode.LIST? 'selected': '';

    return (
      <div className="music-module">
        <div className="header">
          <ul className="left-menu">

          </ul>
          <ul className="right-menu">
            {/*
            <li><i className="iconfont icon">&#xe606;</i></li>
            <li ><i className="iconfont icon">&#xe605;</i></li>
            <li><i className="iconfont icon">&#xe607;</i></li>
            */}
          </ul>
        </div>

        <ScrollArea className="content" speed={0.8} horizontal={false} >
          <div className="music-info">
            <img className="cover" src="http://localhost:3000/files/dc54564e9258d109b01c3e29d158ccbf6d814da9_1461214785000.jpg"/>
            <p className="name">
              {this.state.musicList[this.state.musicIndex]&& this.state.musicList[this.state.musicIndex].name || ''}
            </p>
          </div>
          <div className={classNames('music-control', {playing: this.state.isPlaying})}>
            <i className="iconfont prev-music" onClick={this.prev.bind(this)}>&#xe614;</i>
            <i className="iconfont play" onClick={this.play.bind(this)}>&#xe611;</i>
            <i className="iconfont pause" onClick={this.pause.bind(this)}>&#xe612;</i>
            <i className="iconfont next-music" onClick={this.next.bind(this)}>&#xe613;</i>
          </div>

        </ScrollArea>
      </div>
    )
  }
}


function select(state) {
  return state;
}

export default connect(select)(MusicModule);
