import React from 'react';
import {
    Form, Input, Tooltip, Icon, Select, Checkbox, Button, 
    AutoComplete,notification, message
  } from 'antd';
import { skipLoginByToken  } from '../../redux/actions/userAction' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './Register.css';

const _openNotification = (info) => {
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
            fetch('/auth/user/signup', {
                headers:{
                "Content-Type": "application/json",
                },
                method:'POST',body: JSON.stringify(values)}).then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        return Promise.reject({
                            status: response.status,
                            statusText: response.statusText
                        })
                    }
                })
                .then(data =>{
                    if (data.success) { 
                        localStorage.setItem('Forum-token', data.token)
                        localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
                        localStorage.setItem('userArticles', JSON.stringify(data.articles))
                        localStorage.setItem('userNews', JSON.stringify(data.userNews))
                        this.props.dispatch(skipLoginByToken());
                        _openNotification( 
                            data.info
                        )
                        this.props.history.push('/') 
                    } else {
                        _openNotification(data.info)
                    }
                })
                .catch(err => {
                    console.log('error is', err)
                    message.error('出现错误： '+err.statusText);
                })
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

    _compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
        } else {
        callback();
        }
    }

    _validateToNextPassword = (rule, value, callback) => {
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
            <div className='main-wrapper'>
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
                        validator: this._validateToNextPassword,
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
                        validator: this._compareToFirstPassword,
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
            </div>
        
        );
    }
}
  
const Register = Form.create({ name: 'register' })(RegistrationForm);

export default withRouter(connect()(Register))