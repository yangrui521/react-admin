import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Form,Input,Button,Icon} from 'antd'
import './login.less'
const FormItem = Form.Item



class LoginForm extends Component{
  static propTypes = {
    login: PropTypes.func.isRequired
  }
  handleSubmit = (event) => {
   event.preventDefault()

    const {form} = this.props
    form.validateFields((err,values)=>{
     if(!err){
       //收集数据
       const values = this.props.form.getFieldsValue()
       // console.log(values)
      this.props.login(values)
     }else{

     }
    })

  }
  validatePwd = (rule,value,callback)=>{
    value = value.trim()
    if(value===''){
      callback('必须输入密码')
    }else if(value.length<4 || value.length>8){
      callback('密码长度必须是4到8位')
    }else {
      callback()
    }

  }

  render(){
    const {getFieldDecorator} = this.props.form


    return(
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <Form.Item>
            {
              getFieldDecorator('username',{
              initialValue:'admin',
              rules : [
                {whitespace:true,required:true,message:'必须输入用户名'},
                {min:4,massage:'长度不能小于4'}
              ]
            })(
              <Input type="text" prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
            )
            }

            {/*<Input type="text" prefix={<Icon type="user"/>} placeholder="请输入用户名"/>*/}
          </Form.Item>
          <FormItem>
            {
              getFieldDecorator('password',{
                initialValue:'',
                rules:[
                  {validator: this.validatePwd}
                ]
              })(
                <Input type="password" prefix={<Icon type="lock"/>} placeholder="请输入密码"/>
              )
            }

            {/*<Input type="password" prefix={<Icon type="lock"/>} placeholder="请输入密码"/>*/}
          </FormItem>
          <FormItem >
            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
          </FormItem>
        </Form>
    )
  }
}
export default Form.create()(LoginForm)