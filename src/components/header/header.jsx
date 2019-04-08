import React, {Component} from 'react';
import {Row,Col} from 'antd'
import {withRouter} from 'react-router-dom'
import MemoryUtil from '../../uril/MemoryUtil'
import menuList from '../../config/MenuConfig'
import {formateDate} from '../../uril/util'
import {getWeather} from '../../api/index'
import './header.less'

class Header extends Component {
  //初始状态
  state = {
    sysTime : formateDate(Date.now()),
    dayPictureUrl:'',
    weather:''
  }
  getWeather = async ()=>{
    const {dayPictureUrl,weather} = await getWeather('北京')
    this.setState({dayPictureUrl,weather})
  }
//定义事件的定时器
  getSysTime = ()=>{
    this.intervalId=setInterval(()=>{
      const systime = formateDate(Date.now())
      this.setState({
        sysTime:systime
      })
    },1000)
  }
  GetTitle = ()=>{
    const path = this.props.location.pathname
    //
    for (var i = 0;i<menuList.length;i++){
      const item = menuList[i]
      if (item.key ===path){
        return item.title
      }else if(item.children ){
        const cItem = item.children.find(cItem =>cItem.key ===path)
        if(cItem){
          return cItem.title
        }
      }
    }
  }
//在即将结束的时候清除定时器
  componentWillUnmount (){
    clearInterval(this.intervalId)
  }

  componentDidMount (){
    this.getWeather()
    this.getSysTime()
  }

  render() {
    const username = MemoryUtil.user.username
    const {sysTime,dayPictureUrl,weather}=this.state
    const title = this.GetTitle()
    return (
      <div className="header">
        <div className="header-top"><span>欢迎,{username}</span>
          <a href="javascript:" style={{marginLeft:10}}>退出</a>
        </div>
        <Row className='header-bottom'>
          <Col span={4} className='title'>
            <span >
              {title}
              </span>
          </Col>
          <Col span={20} className='weather'>
            <span className='data'>{sysTime}</span>
            <img className='weather-img' src={dayPictureUrl} alt="weather"/>
            <span className='weather-detail'>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }

}
//将标签包装成组件渲染
export default withRouter(Header)