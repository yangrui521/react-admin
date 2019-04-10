import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductList from './list'
import ProductDetail from './detail'
import ProductAddUpdate from './add-update'
import './product.less'

export default class Product extends Component {
/*
* 产品管理路由组件*/

  render() {
    return(
      <Switch>
        <Route exact={true} path='/product' component={ProductList}/>
        <Route path='/product/detail' component={ProductDetail}/>
        <Route path='/product/add-update' component={ProductAddUpdate}/>
        <Redirect to='/product'/>
      </Switch>
    )

  }
}