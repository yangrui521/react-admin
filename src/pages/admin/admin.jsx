import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import {Row,Col} from 'antd'
import MemoryUtil from '../../uril/MemoryUtil'
import './admin.less'
import LeftNav from '../../components/left-nav/left-nav-reduce'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Category from '../category/category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Home from '../home/home'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'



export default class Admin extends Component {


  render (){
    if(!MemoryUtil || !MemoryUtil.user._id){
      return <Redirect to="/login"/>
    }


    return(
      <Row className='container'>
        <Col span={4}>
          <LeftNav/>
        </Col>
        <Col span={20} className='main'>
          <Header/>
          <div className="content" style={{margin:10}}>
            {/*注册子路由组件*/}
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Redirect to="/home"/>{/*只要与上面不匹配就自动选择到home*/}

            </Switch>
          </div>
          <Footer/>
        </Col>
      </Row>
    )
  }
}