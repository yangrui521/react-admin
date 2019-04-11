import React, {Component} from 'react';
import jsonp from 'jsonp';
import ajax from './ajax';
const BASE= ''

export const reqLogin = (username,password)=> ajax(BASE +'/login',{username,password},'POST')

/*
获取天气的jsonp请求
* */
export const getWeather = (city)=>{

  return new Promise((resolve,reject)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data)=>{
      if(!err && data.status==='success'){
        const {dayPictureUrl,weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl,weather})
      }else {
        alert('获取天气失败')
      }
    })
  })
}

//getWeather('北京')
//获取分类列表
export const reqCategories = (parentId = '0')=> ajax('/manage/category/list',{parentId},'GET')

//添加分类
export const reqAddCategory = (categoryName,parentId)=>ajax('/manage/category/add',{categoryName,parentId},'POST')
//更新分类
export const reqUpdateCategory = ({categoryId,categoryName})=>ajax('/manage/category/update',{categoryId,categoryName},'POST')
//根据分类id获取
export const reqGetCategory = (categoryId)=>ajax('/manage/category/info',{categoryId})

//获取商品分页的列表
//pageNum 当前第几页(从1开始的)  pageSize 每页有几条数据
export const reqProducts = (pageNum,pageSize) =>ajax('/manage/product/list',{pageNum,pageSize})

//搜索商品的分页列表
//searchType : productDesc||pageName
//searchName  : 搜索的关键字
export const reqSearchProducts = ({pageSize,pageNum,searchType,searchName})=>ajax('/manage/product/search',{
  pageSize,
  pageNum,
  [searchType] : searchName
})
//更新指定的商品状态
export const reqUpdateProductStatus = ({productId,status})=>ajax('/manage/product/updateStatus',{productId,status},'POST')










