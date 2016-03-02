import React,{ Component, PropTypes }from 'react';
import styles from './FileList.scss';
import classNames from 'classnames';
import ScrollArea from 'react-scrollbar';

import {UPLOAD_FILES_URL} from '../lib/apiUrl';

const showFileMode = {
  GRAPH:'GRAPH',
  LIST:'LIST'
}

export default class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFileMode: showFileMode.GRAPH,
      selectedFileIds: [],
      selectedFiledownloadUrl: []
    };
  }

  componentDidMount() {

  }

  changeShowFileMode(showFileMode) {
    var self = this;
    return () => {
      self.setState({
        showFileMode : showFileMode,
      })
    }
  }

  uploadFile() {
    var self = this;
    return () => {
      let inputFile = document.createElement('input');
      inputFile.setAttribute('type','file');
      inputFile.addEventListener('change', function(e){
        var MyForm = new FormData();
        MyForm.append('userFile', this.files[0]);
        fetch(UPLOAD_FILES_URL, {
          method: 'post',
          body: MyForm
        }).then(function(){
          self.props.onRefresh();
        })
      }, false);
      inputFile.click();
    }
  }

  selectFile(id, downloadUri) {
    let self = this;
    return () => {
      var tmpSelectedFileIds = Object.assign({}, self.state.selectedFileIds)
      let index = self.state.selectedFileIds.indexOf(id);
      if(index < 0 ) {
        self.state.selectedFileIds.push(id);
        self.state.selectedFiledownloadUrl.push(downloadUri);
      } else {
        self.state.selectedFileIds.splice(index, 1);
        self.state.selectedFiledownloadUrl.splice(index, 1);
      }
      self.setState({
        selectedFileIds: self.state.selectedFileIds,
        selectedFiledownloadUrl: self.state.selectedFiledownloadUrl
      });
    }
  }

  deleteFile() {
    let self = this;
    return () => {
      self.props.onDelete(self.state.selectedFileIds);
    }
  }

  downloadFile() {
    let self = this;
    return () => {
      let aDom = document.createElement('a');
      self.state.selectedFiledownloadUrl.forEach(function(url){
        aDom.href = url;
        aDom.download = url.split('/').pop();
        aDom.click();
      })
    }
  }

  render(){
    let genClassName = (id) => {
      return classNames({'file-wrap' : true, 'selected': this.state.selectedFileIds.indexOf(id) >= 0});
    }
    let fileList = this.props.files.items.map((file) => {
      return (
        <li className={genClassName(file._id)} key={file._id} onClick={this.selectFile(file._id, file.downloadUri)}><div className="mask"></div><img src={file.coverUri}/></li>
      )
    })

    let isGraph = this.state.showFileMode === showFileMode.GRAPH? 'selected': '';
    let isList = this.state.showFileMode === showFileMode.LIST? 'selected': '';
    return (
      <div className="file-list-wrap">
        <div className="header">
          <ul className="left-menu">
            <li className={isGraph} onClick={this.changeShowFileMode(showFileMode.GRAPH)} >图形</li>
            <li className={isList} onClick={this.changeShowFileMode(showFileMode.LIST)}>列表</li>
          </ul>
          <ul className="right-menu">
            <li onClick={this.deleteFile()}><i className="iconfont icon">&#xe606;</i></li>
            <li onClick={this.downloadFile()}><i className="iconfont icon">&#xe605;</i></li>
            <li onClick={this.uploadFile()}><i className="iconfont icon">&#xe607;</i></li>
          </ul>
        </div>
        <ScrollArea className="content" speed={0.8} horizontal={false} >
          <ul className="file-list">
            {fileList}
          </ul>
        </ScrollArea>
      </div>
    )
  }
}

// 类型检查
// FileList.propTypes = {
//   files: PropTypes.arrayOf().isRequired
// }
