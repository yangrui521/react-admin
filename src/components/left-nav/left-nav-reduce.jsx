import React, {Component} from 'react';
import {Menu,Icon} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import './left-nav.less'
import menuList from '../../config/MenuConfig'
import logo from '../../assets/imges/logo.png'
const SubMenu = Menu.SubMenu
const Item = Menu.Item
class LeftNav extends Component {
  getMenuNodes = (list)=>{
   return list.reduce((pre,item)=>{
      if(!item.children){
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      }else {//item有子集  才会调用递归
        const path = this.props.location.pathname
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if(cItem){
          const openKey = item.openKey
          this.openKey = openKey
        }
        pre.push((
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        ))
      }
      return pre
    },[])
  }





  // getMenuNodes = ()=>{
  //   return menuList.map((item)=>{
  //     if(!item.children){
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             <Icon type={item.Icon} />
  //             <span>{item.title}</span>
  //           </Link>
  //
  //         </Menu.Item>
  //       )
  //     }else{
  //       return (
  //         <SubMenu key={item.key} title={<span><Icon type={item.Icon} /><span>{item.title}</span></span>}>
  //           {
  //             item.children.map(cItem=>(
  //               <Menu.Item key={cItem.key}>
  //                 <Link to={cItem.key}>
  //                   <Icon type={cItem.Icon} />
  //                   <span>{cItem.title}</span>
  //                 </Link>
  //
  //               </Menu.Item>
  //             ))
  //           }
  //         </SubMenu>
  //       )
  //     }
  //
  //
  //
  //   })
  // }
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {

    // 获取<menu>所有子节点
    const menuNodes = this.menuNodes
    // console.log('LeftNav render()', menuNodes)

    // 得到请求的路由路径
    let selectKey = this.props.location.pathname
    if(selectKey.indexOf('/product/')===0){
      selectKey ='/product'
    }
    const openKey = this.openKey

    return (
      <div className='left-nav'>

        <Link className='logo' to='/home'>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>

        {/*
         defaultSelectedKey: 只有第一次指定有效果
         */}
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
        >
          {
            menuNodes
          }
        </Menu>
      </div>
    )
  }

}
export default withRouter(LeftNav)