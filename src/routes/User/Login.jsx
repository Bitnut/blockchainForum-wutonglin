import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Typography
  } from 'antd';
import { userLogin} from '../../redux/actions/userAction'
import './Login.css';
import { connect } from 'react-redux'
const { Title} = Typography;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            const { dispatch }=  this.props;
            dispatch(userLogin(this.props.form.getFieldsValue()));
            this.props.onCancel();
        }
      }); 
    }
    handleLogin = () => {
        this.props.onCancel();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='main-wrapper'>  
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Title>请登录</Title>
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
                    <Form.Item >
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
                        或者 <a href="/register">现在注册!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
  }
  
const LoginPage = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = state => {
    return {
        login_info: state.user.login_info,
    }
}

export default connect(mapStateToProps)(LoginPage);