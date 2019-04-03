import React, { Component } from 'react';
import {Button} from 'antd'
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom'
import Admin from '../src/pages/admin/admin'
import Login from '../src/pages/login/login'
export default class extends Component{
  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Admin}/>
          </Switch>
        </Router>
      </div>
    )
  }
}