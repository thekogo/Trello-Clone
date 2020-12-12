import React from 'react';
import Navbar from '../common/Navbar';
import { Layout, Typography, Row, Col, Input, Form, Button, notification } from 'antd'
import axios from '../../config/axios';
import LocalStorageService from '../../services/localStorageService';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';

const { Footer } = Layout;
const { Title } = Typography;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const Login = (props) => {

  const [form] = Form.useForm();

  const onFinish = values => {
    const body = {
      email: values.email,
      password: values.password
    }

    axios.post('/users/login', body)
    .then(result => {
      notification.success({
        message: `การเข้าสู่ระบบเสร็จสิ้น`
      })
      LocalStorageService.setToken(result.data.token);
      const role = jwtDecode(result.data.token).status;
      if (role === "member") {
        props.setRole("member");
        props.history.push("/board");
      }
    })
    .catch(err => {
      notification.error({
        message: `การเข้าสู่ระบบล้มเหลว`
      })
    })
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="layout flex flex-col h-screen">
      <Navbar setRole={props.setRole} />
      <div className="flex-grow px-12 bg-white pt-10">
        <Row align="center">
          <Col span={18}>
            <div className="border border-gray-200 rounded-md shadow-md p-5">
              <Title className="text-center">Login</Title>

              <Form
                {...layout}
                name="control-hooks"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your Email!' },
                    { type: 'email', message: 'Email is not valid'}
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" className="mr-2">
                    Submit
                  </Button>
                  <Button type="button" htmlType="reset" onClick={onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>

            </div>
          </Col>
        </Row>
      </div>
      <Footer style={{ textAlign: 'center' }}>Trello Clone ©2020 Created by Ponlawat</Footer>
    </Layout>
  )
}

export default withRouter(Login);