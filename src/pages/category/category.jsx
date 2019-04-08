import React, {Component} from 'react';
import {Card,Table,Button,Icon} from 'antd'


export default class Category extends Component {
  render() {
    const title = '一级分类列表'
    const extra = (
      <Button type='primary'>
        <Icon type="plus"/>添加
      </Button>
    )
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
            <a href='javascript:'>修改分类</a>&nbsp;&nbsp;&nbsp;
            {this.state.parentId==='0' ? <a href='javascript:' onClick={() => this.showSubCates(category)}>查看子分类</a> : null}

          </span>
        )
      }];

    return(
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          dataSource={dataSource}
          columns={columns}
          pagination={{pageSize:1,showQuickJumper:true,showSizeChanger:true}}
          rowKey='_id'
        />
      </Card>
    )

  }
}