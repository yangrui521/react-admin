import React, {Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'
import {reqCategories, reqUpdateCategory} from '../../api'
import LinkButton from '../../components/link-button/link'
import UpdateForm from './update-form'

export default class Category extends Component {
  state = {
    categories :[],//一级分类
    subCategories:[],//二级分类
    parentId :'0',//父分类id
    parentName :'',//父分类名称
    loading : false
  }
  //发送异步请求获取
  getCategories = async () =>{

    this.setState({
      loading : true
    })
    const {parentId}= this.state
    //异步获取数据列表
    const result = await reqCategories(parentId)
    this.setState({
      loading : false
    })
    if (result.status === 0) {
      const categories = result.data

      if (parentId ==='0'){
        //更新一级分类
        this.setState({categories})
      } else {
        //更新二级分类
        this.setState({subCategories:categories})
      }

    }else {
      message.error('获取列表失败')
    }
  }
  showCategories = ()=>{
    this.setState({
      parentId : '0',
      parentName:'',
      subCategories:[],
      showStatus :0//0是都隐藏 1是显示添加  2是显示更新
    })
  }
  //添加分类
  addCategory=()=>{

  }
  showUpdate = (category)=>{

    this.category = category
    this.setState({
      showStatus : 2
    })
  }

  //更新分类
  updateCategory =async ()=>{
    //得到输入的数据，不能写在重置之后
    const categoryId = this.category._id
    const {categoryName}=this.form.getFieldsValue()
    this.setState({showStatus : 0})
    //重置表单项
    this.form.resetFields()

    //异步请求分类更新
   const result =await reqUpdateCategory({categoryId,categoryName})
    if (result.status===0){
      this.getCategories()
    }

  }
  componentDidMount() {
    this.getCategories()
  }
  showSubCates = (category)=>{
    this.setState({/*state中的数据是异步更新的，不会立即更新*/
      parentId : category._id,
      parentName : category.name
    },()=>{//回调中的数据是最新的
      this.getCategories()
    })

  }
  render() {
    //保证category不是undefined
    const catagory = this.category || {}
    const {categories,subCategories,parentId,parentName,loading,showStatus} = this.state
    const title = parentId === '0'? '一级分类列表' :(
      <span>
        <a href="javascript:">一级列表</a>
        <Icon type='arrow-right'/>
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={()=> {this.setState({showStatus:1})}}>
        <Icon type="plus"/>添加分类
      </Button>
    );

    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={()=>this.showUpdate(category)}>修改分类</LinkButton>

            {this.state.parentId==='0' ?  <LinkButton onClick={()=>this.showSubCates(category)}>查看子分类</LinkButton> : null}

          </span>
        )
      }];

    return(
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          dataSource={parentId==='0' ? categories:subCategories}
          columns={columns}
          pagination={{pageSize:2,showQuickJumper:true,showSizeChanger:true}}
          rowKey='_id'
          loading={loading}
        />
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={()=>this.setState({showStatus:0})}
        >
          <p>添加分类</p>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={()=>{
            this.setState({showStatus:0})
            this.form.resetFields()
          }}
        >
          <UpdateForm categoryName={catagory.name} setForm={form =>this.form =form}/>
        </Modal>
      </Card>
    )

  }
}