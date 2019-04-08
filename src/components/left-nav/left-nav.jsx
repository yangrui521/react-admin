import React, {Component} from 'react';
import {Menu,Icon} from 'antd'
import {Link} from 'react-router-dom'
import './left-nav.less'
import menuList from '../../config/MenuConfig'
import logo from '../../assets/imges/logo.png'
const SubMenu = Menu.SubMenu
const Item = Menu.Item
export default class LeftNav extends Component {
  getMenuNodes = ()=>{
    return menuList.map((item)=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>

          </Menu.Item>
        )
      }else{
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {
              item.children.map(cItem=>(
                <Menu.Item key={cItem.key}>
                  <Link to={cItem.key}>
                    <Icon type={cItem.icon} />
                    <span>{cItem.title}</span>
                  </Link>

                </Menu.Item>
              ))
            }
          </SubMenu>
        )
      }



    })
  }

  render() {
    return (
      <div className="left-nav">
        <Link className="logo" to='/home'>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          {
            this.getMenuNodes()
          }

        </Menu>
      </div>
    )
  }

}