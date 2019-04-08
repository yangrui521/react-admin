import React, {Component} from 'react';

import axios from 'axios';
import {message} from 'antd';

export default function ajax(url,data={},type='GET') {
  return new Promise((resolve,reject)=>{
    let promise
    if(type==='GET'){
      promise = axios.get(url,{
        params:data
      })
    }else{
      promise = axios.post(url,data)
    }
   promise.then(response=>{
      //请求成功
      resolve(response.data)
    }).catch(error=>{
      //请求失败
      message.error('请求异常' + error.message)
    })

  })
}
async function login() {
  const result= await ajax('/login',{username:'TOM',password:'123'},'POST')

  if(result.status===0){
    //成功
  }else{
    //失败
  }

}