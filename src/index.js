import React from 'react';
import ReactDOM from 'react-dom';
import storageUtil from './uril/storageUtil'
import MemoryUtil from './uril/MemoryUtil'
import App from './App';
//将localStorage中的对象保存到内存中
const user = storageUtil.getUser()

if(user._id){
  MemoryUtil.user=user
}


ReactDOM.render(<App/>, document.getElementById('root'))