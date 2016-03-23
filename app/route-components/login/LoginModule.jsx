import React,{ Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import styles from './LoginModule.scss';

export default class LoginModule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="login-module">
        <form id="passwordForm">
          <div className="verify-wrap">
            <div className="account-wrap">
              <input type="text" className="account-ipt" required/>
            </div>
            <div className="password-wrap">
              <input type="password" className="password-ipt" required/>
            </div>
            <div className="signin-wrap">
              <button type="submit" className="signin-btn">登录</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
