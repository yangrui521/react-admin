import React, {Component} from 'react';
import {Form,Input,Button,Icon} from 'antd'
import logo from './logo.png'
import './login.less'
import LoginForm from './login-form'

export default class Login extends Component {


  render (){
    return(
      <div className='login'>
        <div className="login-header">
          <img src={logo} alt="logo"/>
          React:后台管理系统
        </div>
        <div className="login-content">
          <div className="login-box">
            <div className="error-msg-wrap"></div>
            <div className="title">用户登录</div>
            <LoginForm/>
          </div>

        </div>
      </div>
    )
  }
}