import React,{ Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import styles from './LoginModule.scss';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import {
  postLogin
} from '../../actions/login'

class LoginModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: ''
    };
  }

  login = () => {
    this.props.dispatch(postLogin({
      account: this.state.account,
      password:this.state.password
    }));
  }

  handleChange(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  render() {
    const { dispatch, login} = this.props;

    return (
      <div className="login-module">
        <form id="passwordForm">
          <div className="verify-wrap">
                <div className="account-wrap">
                  <TextField
                    hintText="Account"
                    className="account-ipt"
                    onChange={this.handleChange('account')}
                  />
                </div>
                <div className="password-wrap">
                  <TextField
                    hintText="Password"
                    type="password"
                    className="password-ipt"
                    onChange={this.handleChange('password')}
                  />
                </div>
                <div className="signin-wrap">
                  <RaisedButton label="登录" className="signin-btn" secondary={true} onClick={this.login}/>
                </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect((state) => (state))(LoginModule);
