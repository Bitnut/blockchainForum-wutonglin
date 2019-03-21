import React from 'react';
import {
    Form, Input, Tooltip, Icon, Select, Checkbox, Button, AutoComplete,notification
  } from 'antd';
  import http from '../../services/server';
import './register.css';

const openNotification = (info) => {
  const args = {
    message: info,
    duration: 2,
  };
  notification.open(args);
};
const  Option  = AutoComplete.Option;
  
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = http.post('/auth/user/signup', values)
        result.then((res) => {
          if (res.data.success) { // 如果成功
            sessionStorage.setItem('Forum-token', res.data.token) // 用sessionStorage把token存下来
            openNotification( // 登录成功，显示提示语
              res.data.info
            )
            this.props.onIsLoggedInChange(res.data.success);
            this.props.history.push('/') // 进入todolist页面，登录成功
          } else {
            openNotification(res.data.info) // 登录失败，显示提示语
            sessionStorage.setItem('Forum-token', null) // 将token清空
          }
        }, (err) => {
          console.log(err)
          this.$message.error('请求错误！')
          sessionStorage.setItem('Forum-token', null) // 将token清空
        })
        return result
      }
    });
  }
  handleSearch = (value) => {
      let autoCompleteResult;
      if (!value || value.indexOf('@') >= 0) {
          autoCompleteResult = [];
      } else {
          autoCompleteResult = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
      }
      this.setState({ autoCompleteResult });
    }
  

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const children = autoCompleteResult.map(email => <Option key={email}>{email}</Option>);
    return (
      
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
        <Form.Item
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <AutoComplete
              onSearch={this.handleSearch}
              placeholder="input here"
            >
              {children}
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              昵称&nbsp;
              <Tooltip title="给自己起一个昵称～">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        
        <Form.Item
          label="手机号码"
        >
          {getFieldDecorator('phoneNum', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </Form.Item>
        
        
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>我已经阅读了 <a href="">条例</a></Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="register-form-button">Register</Button>
        </Form.Item>
      </Form>
    );
  }
}
  
  const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register