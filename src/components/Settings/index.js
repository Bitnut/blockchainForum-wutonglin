import React from 'react';
import {
    Form, InputNumber, 
    Radio, Button, Input, Avatar
  } from 'antd';

const {TextArea} = Input;
  
  class Basic extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const avatar = '../../../server/public/default_avator.jpg';
      return (
        <div>
          <Avatar size="large" icon="user" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
        <br></br>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="Plain Text"
          >
            <span className="ant-form-text">你好！</span>
          </Form.Item>

          <Form.Item
            label="用户名"
          >
            {getFieldDecorator('userName', {
                rules: [{ required: true }],
            })(
                <Input />
            )}
          </Form.Item>

          <Form.Item
            label="电子邮箱"
          >
            {getFieldDecorator('email', {
                rules: [{ required: true }],
            })(
                <Input />
            )}
          </Form.Item>

          <Form.Item
            label="电话号码"
          >
            {getFieldDecorator('phone', {
                rules: [{ required: true }],
            })(
                <Input />
            )}
          </Form.Item>

          <Form.Item
            label="常用编辑器"
            extra="切换后对新建文章有效"
          >
            {getFieldDecorator('useEditor')(
              <Radio.Group>
                <Radio value="md">Markdown（推荐）</Radio>
                <Radio value="rich">富文本</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item
            label="提醒邮件通知"
          >
            {getFieldDecorator('receiveEmail')(
              <Radio.Group>
                <Radio value="yes">所有动态</Radio>
                <Radio value="no">不接收</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
        </div>
      );
    }
  }

  class Profile extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="Plain Text"
          >
            <span className="ant-form-text">你好！</span>
          </Form.Item>

          <Form.Item
            label="性别"
          >
            {getFieldDecorator('gender')(
              <Radio.Group>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
                <Radio value="secret">保密</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item
            label="自我介绍"
            extra="填写后显示在个人主界面"
          >
            {getFieldDecorator('selfIntro')(
              <TextArea rows={4} />
            )}
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      );
    }
  }

  class Reward extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="Plain Text"
          >
            <span className="ant-form-text">你好！</span>
          </Form.Item>

          <Form.Item
            label="赞赏功能"
            extra="默认开启，关闭后，用户只能浏览页面不能打赏小红花"
          >
            {getFieldDecorator('rewardOn')(
              <Radio.Group>
                <Radio value="yes">开启</Radio>
                <Radio value="no">关闭</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item
            label="赞赏个数"
          >
            {getFieldDecorator('rewardNumber', { initialValue: 3 })(
              <InputNumber min={1} max={10} />
            )}
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedBasic = Form.create({ name: 'settings_basic',
  mapPropsToFields(props) {
    return {
      userName: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.user_name,
      }),
      email: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.user_email,
      }),
      phone: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.user_phone,
      }),
      useEditor: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.user_editor,
      }),
      receiveEmail: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.email_message,
      }),
    };},
  })(Basic);
  const WrappedProfile = Form.create({ name: 'settigns_profile', 
  mapPropsToFields(props) {
    return {
      gender: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.user_gender,
      }),
      selfIntro: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.self_introduction,
      })
    };}
  })(Profile);
  const WrappedReward = Form.create({ name: 'settigns_reward',
  mapPropsToFields(props) {
    return {
      rewardOn: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.reward_setting,
      }),
      rewardNumber: Form.createFormField({
        ...props.userInfo,
        value: props.userInfo.reward_number,
      })
    };}
  })(Reward);

  export {WrappedBasic, WrappedProfile, WrappedReward};