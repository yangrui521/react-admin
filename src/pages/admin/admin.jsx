import React, {Component} from 'react';
import MemoryUtil from '../../uril/MemoryUtil'
import {Redirect} from 'react-router-dom'
export default class Admin extends Component {


  render (){
    if(!MemoryUtil || !MemoryUtil.user._id){
      return <Redirect to="/login"/>
    }


    return(
      <div>admin</div>
    )
  }
}