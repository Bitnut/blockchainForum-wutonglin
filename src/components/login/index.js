import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Typography, notification
  } from 'antd';
import http from '../../services/server';
import './index.css';
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
          if(result === 'error') {
            localStorage.clear();
            this.props.onCancel();
            openNotification(
              '请求错误请检查网络状况'
            )
          }
          result.then((res) => {
            if (res.data.success) { // 如果成功
              localStorage.setItem('Forum-token', res.data.token) // 用localStorage把token存下来
              const userInfo = JSON.stringify(res.data.userInfo)
              localStorage.setItem('userInfo', userInfo)
              openNotification( // 登录成功，显示提示语
                res.data.info
              )
              this.props.onIsLoggedInChange();
              this.props.onCancel();
            } else {
              openNotification(res.data.info) // 登录失败，显示提示语
              localStorage.clear();
            }
          },(err) => {
            console.log(err)
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