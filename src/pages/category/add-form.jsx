import React,{Component} from 'react'
import {Form,Input,Select} from 'antd'
import PropTypes from 'prop-types'

class AddForm extends Component{
  static propTypes = {
    categoryName : PropTypes.string.isRequired,
    parentId : PropTypes.string.isRequired,
    setForm : PropTypes.func.isRequired
  }
  componentWillMount() {
    //将当前的prop中的form交给父组件
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {categoryName,parentId} = this.props

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('parentId',{
            initialValue:parentId
          })(
            <Select>
              <Select.Option value='0'>一级分类</Select.Option>
              {
                categoryName.map(c =><Select.Option value={c._id}>{c.name}</Select.Option>)
              }

            </Select>
          )
          }
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('categoryName',{
            initialValue : '',
            rules:[{}]
          })(
            <Input type='text' placeholder='请输入分类'/>
          )}
        </Form.Item>
      </Form>
    )
  }


}

export default Form.create()(AddForm)