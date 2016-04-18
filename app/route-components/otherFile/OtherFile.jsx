import React,{ Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import OtherFileList from './OtherFileList';
import {
  fetchOtherFileList
} from '../../actions/getOtherFile';

import {
  deleteFile
} from '../../actions/deleteFile';

import {
  uploadFile
} from '../../actions/uploadFile';


import { fileTypeHash } from '../../lib/fileType';

class AllFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(fetchOtherFileList());
  }

  render(){
    const { dispatch, otherFile} = this.props;
    return (
      <OtherFileList
        files={otherFile}
        onRefresh={() => dispatch(fetchFileList())}
        onDelete={(ids) => dispatch(deleteFile(ids))}
        onUpload={(files) => dispatch(uploadFile(files))}
      />
    )
  }
}

function select(state) {
  return state;
}

export default connect(select)(AllFile);
