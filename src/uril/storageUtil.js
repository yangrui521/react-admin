import React, {Component} from 'react';
const USER_KEY = 'user_key'
export default {
  saveUser(user){
    localStorage.setItem(USER_KEY,JSON.stringify(user))
  },
  getUser(){
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  removeUser(){
    localStorage.removeItem(USER_KEY)
  }


}