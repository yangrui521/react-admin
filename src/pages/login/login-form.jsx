import React, {Component} from 'react';
import {Form,Input,Button,Icon} from 'antd'
import './login.less'
const FormItem = Form.Item
export default class LoginForm extends Component{

  render(){
    return(
        <Form className="login-form">
          <Form.Item>
            <Input type="text" prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
          </Form.Item>
          <FormItem>
            <Input type="password" prefix={<Icon type="lock"/>} placeholder="请输入密码"/>
          </FormItem>
          <FormItem >
            <Button type="primary" className="login-form-button">登陆</Button>
          </FormItem>
        </Form>
    )
  }
}
