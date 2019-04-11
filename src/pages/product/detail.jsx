import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import {Card,List,Icon} from 'antd'
import LinkButton from '../../components/link-button/link'
import {reqGetCategory} from '../../api/index'


const {Item} = List

export default class ProductDetail extends Component {
  state = {
    cName1:'', //一级分类
    cName2:'', //二级分类
  }
  //获取当前商品所属分类
  getCategoryNames = async ()=>{
    //得到商品的分类id
    const { pCategoryId,categoryId} = this.props.location.state.product
    //    const result = await reqGetCategory(categoryId)
    //     const cName1 = result.data.name
    // console.log(cName1)

    // console.log(pCategoryId,categoryId)

    if(pCategoryId === 0){
    //   //一级分类的名字
       const result = await reqGetCategory(categoryId)
       console.log(result)
       const cName1 =result.data.name

       this.setState({
         cName1
       })

     }else {
      //二级分类名字
      /*let result1 = await reqGetCategory(pCategoryId)
      const result2 = await reqGetCategory(categoryId)*/
       const [result1, result2] = await Promise.all([reqGetCategory(pCategoryId), reqGetCategory(categoryId)])
       console.log(result1 ,result2)


      const cName1 =result1.data.name

       const cName2 =result2.data.name
       this.setState({
         cName1,
         cName2
       })

     }


  }

  componentDidMount() {
    this.getCategoryNames()
  }

  render() {
    //从location中取出state中的product
    const {name,desc,price} = this.props.location.state.product
    const {cName1,cName2}= this.state
    const title = (
      <span>
        <LinkButton>
          {/*图标都是用字体大小控制的*/}
          <Icon type='arrow-left' style={{fontsize:20}}/>
        </LinkButton>
        商品详情
      </span>
    )

    return (
      <Card title={title}>
        <List className='detail'>
          <Item>
            <span className='left'>商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='left'>商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className='left'>商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className='left'>所属分类:</span>
            {/*<span>电脑-->电脑11</span>*/}
            <span>{cName1}--->{cName2}</span>
          </Item>
        </List>

      </Card>
    )

  }
}