import React, {Component} from 'react';

import {Redirect} from 'react-router-dom'
import logo from '../../assets/imges/logo.png'
import './login.less'
import LoginForm from './login-form'
import {reqLogin} from '../../api'
import storageUtil from '../../uril/storageUtil'
import MemoryUtil from '../../uril/MemoryUtil'

export default class Login extends Component {
  state = {
    errorMsg : '',
  }
  login = async ({username,password})=>{
    const result = await reqLogin(username,password)
    // console.log(result)
    if(result.status ===0){
      const user = result.data
      //保存在local中
      storageUtil.saveUser(user)
      //保存在内存中
      MemoryUtil.user = user
      this.props.history.replace('/')
    }else{
      this.setState({
        errorMsg:result.msg
      })
    }
  }


  render (){
    if(MemoryUtil.user && MemoryUtil.user._id){
      return <Redirect to="/"/>
    }

    const {errorMsg} = this.state
    return(
      <div className='login'>
        <div className="login-header">
          <img src={logo} alt="logo"/>
          React:后台管理系统
        </div>
        <div className="login-content">
          <div className="login-box">
            <div className="error-msg-wrap">
              <div className={errorMsg ? 'show' : ''}>{errorMsg}</div>
            </div>
            <div className="title">用户登录</div>
            <LoginForm login={this.login}/>

          </div>

        </div>
      </div>
    )
  }
}