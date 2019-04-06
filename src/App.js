import React, { Component } from 'react';
import {Button} from 'antd'
import {BrowserRouter as Router,Switch,Route,NavLink,Redirect} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
export default class App extends Component{
  render(){
    return (
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