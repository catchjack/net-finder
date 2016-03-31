import React,{ Component }from 'react';
import { connect } from 'react-redux';
import styles from './LoginModule.scss';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import { PropTypes } from 'react-router';
import {
  postLogin
} from '../../actions/login'

class LoginModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      isShowAccountError: false,
      accountErrorText: '请输入账号',
      isShowPasswordError: false,
      passwordErrorText: '请输入密码',
      openDialog: false,
      errorMessage: ''
    };
  }

  login = () => {
    if(this.state.account == '') {
      return this.setState({
        isShowAccountError: true
      })
    }
    if(this.state.password == '') {
      return this.setState({
        isShowPasswordError: true
      })
    }

    this.props.dispatch(postLogin({
      account: this.state.account,
      password: this.state.password
    })).then((res) => {
      this.context.history.replaceState(null, '/all');
    }, (err) => {
      console.log(err);
      this.setState({
        openDialog: true,
        errorMessage: err.errorMessage,
        account: '',
        password: ''
      })
    });
  }

  handleChange(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  handleChange(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  handleFocus(key) {
    return (event) => {
      this.setState({
        [`isShow${key}Error`] : false
      })
    }
  }

  handleDiglogClose = () => {
    this.setState({openDialog : false});
  }



  render() {
    const { dispatch, login} = this.props;

    const actions = [
     <FlatButton
       label="我知道了"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.handleDiglogClose}
     />,
   ];

    return (
      <div className="login-module">
        <form id="passwordForm">
          <div className="verify-wrap">
                <div className="account-wrap">
                  <TextField
                    hintText="Account"
                    className="account-ipt"
                    fullWidth={true}
                    value={this.state.account}
                    onChange={this.handleChange('account')}
                    onFocus={this.handleFocus('Account')}
                    errorText={this.state.isShowAccountError ? this.state.accountErrorText : ''}
                  />
                </div>
                <div className="password-wrap">
                  <TextField
                    hintText="Password"
                    type="password"
                    className="password-ipt"
                    fullWidth={true}
                    value={this.state.password}
                    onEnterKeyDown={this.login}
                    onChange={this.handleChange('password')}
                    onFocus={this.handleFocus('Password')}
                    errorText={this.state.isShowPasswordError ? this.state.passwordErrorText : ''}
                  />
                </div>
                <div className="signin-wrap">
                  <RaisedButton
                    label="登录"
                    className="signin-btn"
                    secondary={true}
                    fullWidth={true}
                    onClick={this.login}
                  />
                </div>
                <Dialog
                  title="提示"
                  actions={actions}
                  open={this.state.openDialog}
                  onRequestClose={this.handleDiglogClose}
                >
                  {this.state.errorMessage}
                </Dialog>
          </div>
        </form>
      </div>
    )
  }
}

LoginModule.contextTypes = { history: PropTypes.history }

export default connect((state) => (state))(LoginModule);
