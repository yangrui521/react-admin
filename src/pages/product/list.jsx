import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import {Card,Select,Input,Icon,Button,Table,message} from 'antd'
import LinkButton from "../../components/link-button/link";
import {reqProducts,reqSearchProducts,reqUpdateProductStatus} from '../../api/index'
const {Option} = Select
export default class ProductList extends Component {
  /*
  *商品路由组件*/
  state={
    products:[],
    total: 0, //总商品数量
    searchType : 'productName',//搜索类型 按名称搜 productName 按描述搜 productDesc
    searchName: ''
  }
  //获取指定页码的商品列表可能带搜索
  getProducts=async (pageNum)=>{
    //保存请求的页码
    this.pageNum = pageNum
    let result
    const {searchName,searchType}=this.state
    if (!searchName){
//一般分页
      result = await reqProducts(pageNum,5)
    } else{
//搜索分页
      result = await reqSearchProducts({pageNum,searchType,searchName,pageSize:5})
    }


    if (result.status === 0) {
      const {total,list} = result.data
      this.setState({
        products:list,
        total
      })
    }
    
  }
  //实现状态的更新
  updateProductStatus = async (productId,status)=>{

    const result = await reqUpdateProductStatus({productId,status})
    message.success('更新成功')
    if(result.status===0){
      //必须获取当前页面的商品列表
      this.getProducts(this.pageNum)
    }

  }
  
  
  //发送ajax请求就在这个里面
  componentDidMount() {
    this.getProducts(1)
  }


  componentWillMount() {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex:'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render :(price)=> '￥' + price
      },
      {
        title: '状态',
        //dataIndex:'status',
        width:150,
        render :(product)=> {
          let btnText = '下架'
          let text = '在售'
          if (product.status===2) {
            btnText = '上架'
            text = '已下架'
          }
          // const btnText = status === 1 ? '下架':'上架'
          // const text = status === 1 ? '在售' :'已下架'
          //得到点击后最新的状态值
          const status = product.status === 1 ? 2 :1

          return (
            <span>
              <Button type='primary' onClick={()=>this.updateProductStatus(product._id,status)}>
                {btnText}
              </Button>&nbsp;&nbsp;
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width:120,
        render :(product)=> {
          return (
            <span>
              <LinkButton onClick={()=>this.props.history.push('/product/detail',product)}>详情</LinkButton>
              <LinkButton>修改</LinkButton>

            </span>
          )
        }
      }
      ];
  }


  render() {
    //读取状态数据
    const {products,total,searchType} = this.state

    //左侧
    const title =(
      <span>
        <Select
          value={searchType}
          style={{marginRight : 10}}
          onChange={val => this.setState({searchType:val})}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='请输入关键字'
          style={{width:150,marginRight : 10}}
          onChange={event => this.setState({searchName:event.target.value})}
        />
        <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    )

    //右侧
    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加产品
      </Button>
    )

    return(
     <Card title={title} extra={extra}>
        <Table
          bordered
          dataSource={products}
          columns={this.columns}
          pagination={{total ,pageSize:5,showQuickJumper:true,showSizeChanger:true}}
          rowKey='_id'
          onChange={(pageNum)=>this.getProducts(pageNum.current)}
        />
     </Card>
    )

  }
}