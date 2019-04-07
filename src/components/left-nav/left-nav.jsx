import React, {Component} from 'react';
import {Menu,Icon} from 'antd'
import './left-nav.less'
import menuList from '../../config/MenuConfig'
const SubMenu = Menu.SubMenu
const Item = Menu.Item
export default class LeftNav extends Component {
  getMenuNodes = ()=>{
    return menuList.map((item)=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Icon type={item.Icon} />
            <span>{item.title}</span>
          </Menu.Item>
        )
      }else{
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.Icon} /><span>{item.title}</span></span>}>
            {
              item.children.map(cItem=>(
                <Menu.Item key={cItem.key}>
                  <Icon type={cItem.Icon} />
                  <span>{cItem.title}</span>
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
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          {
            this.getMenuNodes()
          }
          {/*<Menu.Item key="1">*/}
            {/*<Icon type="pie-chart" />*/}
            {/*<span>Option 1</span>*/}
          {/*</Menu.Item>*/}
          {/*<SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>*/}
            {/*<Item key="5">Option 5</Item>*/}
            {/*<Item key="6">Option 6</Item>*/}
            {/*<Item key="7">Option 7</Item>*/}
            {/*<Item key="8">Option 8</Item>*/}
          {/*</SubMenu>*/}
        </Menu>
      </div>
    )
  }

}