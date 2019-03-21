import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Typography, notification
  } from 'antd';
import http from '../../services/server';
import './login.css';
const { Title} = Typography;

const openNotification = (info) => {
  const args = {
    message: info,
    duration: 2,
  };
  notification.open(args);
};


class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const result = http.post('/auth/user/login', values)
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
    handleLogin = () => {
      this.props.actions.userLogin('/auth/user/login', this.props.form.getFieldsValue())
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
            <div className="login-content">
                <Title>请登录</Title>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('nickName', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                        })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入您的密码!' }],
                        })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                        })(
                        <Checkbox>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                        或者 <a href="/user/register">现在注册!</a>
                    </Form.Item>
                </Form>
            </div>
    
      );
    }
  }
  
const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default Login;