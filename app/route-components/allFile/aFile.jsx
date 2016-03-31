import React,{ Component, PropTypes }from 'react';
import classNames from 'classnames';

export default class aFile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }




  render(){
    const { type , coverUrl , downUrl , showMode } = this.props;

    return (
      <li className={genClassName(file._id)} key={file._id} onClick={this.selectFile(file._id, file.downloadUri)}>
        <div className="mask"><i className="iconfont">&#xe618;</i></div>
        <img src={file.coverUri}/>
      </li>
    )
  }

}
